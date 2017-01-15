from django.contrib import admin
from .models import Stanovanje, Soba, Paneli, Paneli_Tip

admin.site.register(Stanovanje)
admin.site.register(Soba)
admin.site.register(Paneli)
admin.site.register(Paneli_Tip)
