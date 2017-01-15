import json
from .models import *
from .forms import *
from django.shortcuts import render,render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.admin.views.decorators import staff_member_required
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.views.generic import TemplateView
from django.template import RequestContext
from django.utils.decorators import method_decorator

@csrf_protect
def register(request):
    context = {}

    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = User.objects.create_user(
            username=form.cleaned_data['username'],
            password=form.cleaned_data['password1'],
            email=form.cleaned_data['email']
            )
            return HttpResponseRedirect(reverse('index'))#('/register/success/')
    else:
      form = RegistrationForm()
    context['form'] = form
    return render(request, 'irfoton_web/register.html',context)

@login_required 
def register_success(request):
    return render_to_response(
    'irfoton_web/success.html',
    )

def index(request):
  context = {}

  if request.method=='POST':
    form = LoginForm(request.POST)
    if form.is_valid():
      user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
      if user is not None:
        login(request, user)
        if request.user.is_staff:
          return HttpResponseRedirect(reverse('administrator'))
        else:
          return HttpResponseRedirect(reverse('nacrtovanje'))
      #  context['username'] = user
      #context['username'] = form.cleaned_data['username']
  else:
    form = LoginForm()
  context['loginForm'] = form
  #sys.stderr.write(context['user'])
  return render(request, 'irfoton_web/index.html', context)

@login_required
def ogrevanje(request):
    return render(request, 'irfoton_web/ogrevanje.html', {})

def test(request):
    return render(request, 'irfoton_web/test.html', {})

def logout_user(request):
  logout(request)
  return HttpResponseRedirect(reverse('index'))


@login_required
def podatki(request):
  context = {'loginForm':LoginForm()}
  stanovanje = Stanovanje.objects.get(user_id=request.user)
  esform = EditProfileForm(instance=stanovanje)
  
  if request.method=='POST':
    esform = EditProfileForm(request.POST, instance=stanovanje)
    if esform.is_valid():
      esform.save()
      return HttpResponseRedirect(reverse('podatki'))
      
  context['stanovanje'] = stanovanje
  context['edit_stanovanje_form'] = esform

  return render(request, 'irfoton_web/podatki.html', context)

@login_required
def merilo_vnesi(request):
  if request.method=='POST':
    stanovanje = Stanovanje.objects.get(user_id=request.user)
    stanovanje.merilo = request.POST['merilo']
    stanovanje.save()
    return HttpResponse('')

@login_required
def nacrtovanje(request):
    context = {}
    try:
        stanovanje = Stanovanje.objects.all().get(user_id=request.user)
    except Stanovanje.DoesNotExist:
        stanovanje = Stanovanje(user= request.user)
        stanovanje.save()
    context['stanovanje'] = stanovanje
    soba = Soba.objects.filter(user_id=request.user)
    context['soba'] = soba
    paneli = Paneli_Tip.objects.all()
    context['paneli'] = paneli
    return render(request, 'irfoton_web/nacrtovanje.html', context)

@login_required
def nova_soba(request):
    if request.method == 'POST':
      #ime_soba = request.POST['ime']
      ime_soba = request.POST['ime']
      sirina = request.POST['sirina']
      visina = request.POST['visina']
      st_sten = request.POST['st_sten']
      namembnost = request.POST['namembnost'] 
      merilo = request.POST['merilo'] 
      soba = Soba(ime=ime_soba, height= visina, width=sirina, zun_stene=st_sten, 
        namembnost=namembnost, user= request.user, pos_x=0.1, pos_y=0.1)
      soba.save()
      stanovanje = Stanovanje.objects.get(user_id=request.user)
      stanovanje.merilo = merilo
      stanovanje.save()
    dict = {'id':soba.id}
    return HttpResponse(json.dumps(dict), content_type='application/json')

@login_required
def izbrisi_sobo(request):
    if request.method == 'POST':
      #ime_soba = request.POST['ime']
      id_soba = request.POST['id']
      soba = Soba.objects.all().get(id = id_soba, user_id=request.user)
      soba.delete()
    return HttpResponse('')

@login_required    
def posodobi_sobo(request):
    if request.method == 'POST':
      #ime_soba = request.POST['ime']
      id_soba = request.POST['id']
      ime_soba = request.POST['ime']
      sirina = request.POST['sirina']
      visina = request.POST['visina']
      st_sten = request.POST['st_sten']
      namembnost = request.POST['namembnost']   
      soba = Soba.objects.get(id=id_soba, user_id=request.user)
      soba.ime = ime_soba
      soba.height = visina      
      soba.width = sirina
      soba.zun_stene = st_sten 
      soba.namembnost = namembnost
      soba.save()
    return HttpResponse('')

@csrf_exempt
@login_required
def posodobi_pozicijo(request):
    if request.method == 'POST':
      #ime_soba = request.POST['ime']
      id_soba = request.POST['id_soba']
      print request.POST['id_soba']
      pos_x = request.POST['pos_x']
      pos_y = request.POST['pos_y']
      soba = Soba.objects.get(id=id_soba, user_id=request.user)
      soba.pos_x = pos_x
      soba.pos_y = pos_y
      soba.save()
    return HttpResponse('') 

@method_decorator(staff_member_required, name='dispatch')
class UsersView(TemplateView):
    template_name = 'irfoton_web/administrator.html'

    def get_context_data(self,**kwargs):
        context = super(UsersView,self).get_context_data(**kwargs)
        context['object_list'] = User.objects.all()
        return context
