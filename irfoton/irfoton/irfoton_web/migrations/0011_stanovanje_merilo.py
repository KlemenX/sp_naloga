# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-10 21:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('irfoton_web', '0010_auto_20170110_2140'),
    ]

    operations = [
        migrations.AddField(
            model_name='stanovanje',
            name='merilo',
            field=models.FloatField(null=True),
        ),
    ]
