"""fri_ws URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.views.generic.edit import CreateView
from django.contrib.auth.forms import UserCreationForm
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^logout/', views.logout_user, name='logout'),
	url(r'^nacrtovanje/', views.nacrtovanje, name='nacrtovanje'),
	url(r'^podatki/', views.podatki, name='podatki'),
    url(r'^nova_soba/', views.nova_soba, name='nova_soba'),
    url(r'^posodobi_sobo/', views.posodobi_sobo, name='posodobi_sobo'),
    url(r'^izbrisi_sobo/', views.izbrisi_sobo, name='izbrisi_sobo'), 
    url(r'^posodobi_pozicijo/', views.posodobi_pozicijo, name='posodobi_pozicijo'),    
	url(r'^ogrevanje/', views.ogrevanje, name='ogrevanje'),
    url(r'^register/', views.register, name='register'),
    url(r'^register/success/', views.register_success,name='register-success'),
    #url(r'^administrator/', views.admin_podatki, name='admin_podatki'),
    url(r'^administrator/$', views.UsersView.as_view(), name='administrator'),
    url(r'^admin/', admin.site.urls),
]
