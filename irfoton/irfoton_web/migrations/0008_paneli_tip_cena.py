# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-10 10:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('irfoton_web', '0007_auto_20170110_1046'),
    ]

    operations = [
        migrations.AddField(
            model_name='paneli_tip',
            name='cena',
            field=models.FloatField(null=True),
        ),
    ]