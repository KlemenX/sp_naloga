from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

from datetime import datetime

# Create your models here.

class Article(models.Model):
  title = models.CharField(max_length=100, default='')
  content = models.TextField()
  pub_date = models.DateTimeField( default=datetime.now )
  author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

class Comment(models.Model):
  comment = models.TextField()
  color = models.CharField(max_length=10, null=True)
  pub_date = models.DateTimeField( default=datetime.now )
  article = models.ForeignKey( Article, on_delete=models.CASCADE )
  author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

class Stanovanje(models.Model):
  izolacija_sten = models.FloatField(null=True)
  izolacija_tal = models.FloatField(null=True)
  temp_primankljaj = models.FloatField(null=True)
  visina_stropa = models.FloatField(null=True)
  nacin_montaze = models.FloatField(null=True)
  merilo = models.FloatField(null=True)  
  user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

class Soba(models.Model):
	ime = models.CharField(max_length=30, null=True)
  	height = models.FloatField(null=True)
  	width = models.FloatField(null=True)
  	pos_x = models.FloatField(null=True)
  	pos_y= models.FloatField(null=True)
  	zun_stene = models.IntegerField(null=True)
   	namembnost = models.CharField(max_length=15, null=True)
  	user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

class Paneli(models.Model):
  	moc = models.IntegerField(null=True)
  	soba = models.ForeignKey(Soba, on_delete=models.SET_NULL, null=True)	

class Paneli_Tip(models.Model):
  	moc = models.IntegerField(null=True)
  	height = models.FloatField(null=True)
  	width = models.FloatField(null=True)
  	cena = models.FloatField(null=True)


