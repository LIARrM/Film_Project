from django.db import models

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Genre(models.Model):
    genre = models.CharField(max_length=20)


class Year(models.Model):
    year = models.IntegerField()


class Country(models.Model):
    name = models.CharField(max_length=255)


class Producer(models.Model):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    age = models.IntegerField()

class Actor(models.Model):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    age = models.IntegerField()


class Film(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    genre = models.ManyToManyField(Genre)  # mijankyal axyusak
    year = models.ForeignKey(Year, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    raiting = models.IntegerField()
    producer = models.ForeignKey(Producer, on_delete=models.CASCADE)
    actor = models.ManyToManyField(Actor)
    duration = models.IntegerField()
    photo = models.ImageField(upload_to='photos')
    video = models.FileField(upload_to='videoes')

# film_id, user_id, text, rating

class ComentFilm(models.Model):
    film = models.ForeignKey(Film, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    rating = models.PositiveIntegerField()




# Create your models here.
