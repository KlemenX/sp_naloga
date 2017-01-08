from django import forms

class LoginForm(forms.Form):
  username = forms.CharField(label='Username', max_length=100)
  password = forms.CharField(max_length=100, widget=forms.PasswordInput)

#  title = forms.CharField(label='Title', max_length=100)
#  content = forms.CharField(label='Content')
#  pub_date = forms.DateTimeField(label='Publish date')
