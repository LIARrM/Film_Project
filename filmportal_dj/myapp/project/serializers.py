

from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Genre, Year, Country,Actor, Producer, Film, ComentFilm

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__' #bolor dashter@ sa nshanakuma


class GenreSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class YearSerializer(ModelSerializer):
    class Meta:
        model = Year
        fields = ('id','year')


class CountrySerializer(ModelSerializer):
    class Meta:
        model = Country
        fields = ('id', 'name')

class ActorSerializer(ModelSerializer):
    class Meta:
        model = Actor
        fields = '__all__'


class ProducerSerializer(ModelSerializer):
    class Meta:
        model = Producer
        fields = '__all__'




class FilmSerializer(ModelSerializer):
    genre = GenreSerializer(many = True)
    actor = ActorSerializer(many = True)
    year = YearSerializer()
    country = CountrySerializer()
    producer = ProducerSerializer()


    class Meta:
        model = Film
        fields = '__all__'


class ComentFilmSerializer(ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = ComentFilm
        fields = '__all__'


