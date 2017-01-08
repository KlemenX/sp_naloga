from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, permission_required

from .forms import LoginForm

# Create your views here.

def index(request):
  context = {}

  if request.method=='POST':
    form = LoginForm(request.POST)
    if form.is_valid():
      user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
      if user is not None:
        login(request, user)
        return HttpResponseRedirect('nacrtovanje/')
      #  context['username'] = user
      #context['username'] = form.cleaned_data['username']
  else:
    form = LoginForm()
  context['loginForm'] = form
  #sys.stderr.write(context['user'])
  return render(request, 'irfoton_web/index.html', context)

def nacrtovanje(request):
  return render(request, 'irfoton_web/nacrtovanje.html', {})

def ogrevanje(request):
    return render(request, 'irfoton_web/ogrevanje.html', {})

def podatki(request):
    return render(request, 'irfoton_web/podatki.html', {})

def logout_user(request):
  logout(request)
  return HttpResponseRedirect(reverse('index'))

def login_user(request):
  context = {}

  if request.method=='POST':
    form = LoginForm(request.POST)
    if form.is_valid():
      user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
      if user is not None:
        login(request, user)
        return render(request, 'irfoton_web/nacrtovanje.html')

      #  context['username'] = user
      #context['username'] = form.cleaned_data['username']
  else:
    form = LoginForm()
  context['loginForm'] = form
  #sys.stderr.write(context['user'])
  return render(request, 'irfoton_web/index.html')

