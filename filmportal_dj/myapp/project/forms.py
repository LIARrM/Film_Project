

from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.forms import ModelForm
from  . models import Film, ComentFilm, Actor, Producer

class UserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'password1', 'password2', 'email'] #en dashteri anunerna vor validacia ani


class FilmForm(ModelForm):
    class Meta:
        model = Film
        fields = '__all__'



class ComentForm(ModelForm):
    class Meta:
        model = ComentFilm
        fields = '__all__'


class ActorForm(ModelForm):
    class Meta:
        model = Actor
        fields = "__all__"

class ProducerForm(ModelForm):
    class Meta:
        model = Producer
        fields = '__all__'