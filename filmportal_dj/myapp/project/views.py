from django.shortcuts import render
from .forms import UserForm, FilmForm, ComentForm, ActorForm, ProducerForm
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, GenreSerializer, YearSerializer, CountrySerializer, ActorSerializer, \
    ProducerSerializer, FilmSerializer, ComentFilmSerializer
from .models import Genre, Year, Country, Actor, Producer, Film, ComentFilm
from django.core.paginator import Paginator
from django.contrib.auth.forms import PasswordChangeForm, UserChangeForm
from django.contrib.auth.models import User
import re


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        form = UserForm(request.data)
        if form.is_valid():
            form.save()
            return Response({'message': 'data added'})
        else:
            return Response({'errors': form.errors})


@api_view(['POST'])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'})
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'})

    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response({'user': UserSerializer(request.user).data})


@api_view(['GET'])
def getCountry(request):
    data = Country.objects.all()
    return Response({'country': CountrySerializer(data, many=True).data})


@api_view(['GET'])
def getGenres(request):
    data = Genre.objects.all()
    return Response({'genre': GenreSerializer(data, many=True).data})


@api_view(['GET'])
def getYears(request):
    data = Year.objects.all()
    return Response({'year': YearSerializer(data, many=True).data})


@api_view(['GET'])
def getActors(request):
    data = Actor.objects.all()
    return Response({'actor': ActorSerializer(data, many=True).data})


@api_view(['GET'])
def getProducers(request):
    data = Producer.objects.all()
    return Response({'producer': ProducerSerializer(data, many=True).data})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addFilm(request):
    request.data['user'] = request.user
    if request.method == 'POST':
        form = FilmForm(request.data, request.FILES)
        if form.is_valid():
            form.save()
            return Response()
        else:
            return Response({'errors': form.errors})


@api_view(['GET'])
def getFilms(request):
    data = Film.objects.all()
    return Response({'films': FilmSerializer(data, many=True).data})


@api_view(['GET'])
def getFilmById(request, id):
    data = Film.objects.get(pk=id)
    return Response({'film': FilmSerializer(data).data})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addComentFilm(request):
    if request.method == 'POST':
        data = request.data
        data['user'] = request.user.id

        form = ComentForm(request.data)

        if form.is_valid():
            form.save()
            return Response({'message': 'ok'})
        else:
            return Response({'errors': form.errors})


@api_view(['GET'])
def get_comment(request, id):
    data = ComentFilm.objects.filter(film_id=id)
    return Response({'comment': ComentFilmSerializer(data, many=True).data})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteComment(request, id):
    try:
        comment = ComentFilm.objects.get(pk=id)
        print(comment)
        comment.delete()
        return Response({'message': 'Comment deleted successfully'})
    except ComentFilm.DoesNotExist:
        return Response({'error': 'Comment not found'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    request.user.auth_token.delete()
    logout(request)
    return Response({'msg': 'logout successfully'})


@api_view(['GET'])
def filterGenre(request, genre):
    films = Film.objects.filter(genre=genre)
    serializer = FilmSerializer(films, many=True)
    return Response({'films': serializer.data})


@api_view(['GET'])
def filterYear(request, year):
    films = Film.objects.filter(year_id=year)
    serializer = FilmSerializer(films, many=True)
    return Response({'films': serializer.data})


@api_view(['GET'])
def filterCountry(request, country):
    films = Film.objects.filter(country=country)
    serializer = FilmSerializer(films, many=True)
    return Response({'films': serializer.data})


@api_view(['GET'])
def filter(request, title):
    films = Film.objects.filter(title__istartswith=title)
    serializer = FilmSerializer(films, many=True)
    return Response({'films': serializer.data})


@api_view(['DELETE'])
def delFilm(request, id):
    data = Film.objects.filter(pk=id).delete()
    return Response({'film': FilmSerializer(data).data})


@api_view(['PUT'])
def change(request):
    try:
        user = User.objects.get(username=request.data['username'])
    except:
        return Response({'errors': 'User not found'})
    form = PasswordChangeForm(user=user, data=request.data)
    if form.is_valid():
        form.save()
        return Response({'msg': 'ok'})
    else:
        return Response({'errors': form.errors})


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_last_name(request):
    if request.method == "PUT":
        user = request.user
        last_name = request.data.get('last_name')

        if last_name is not None and last_name != '':
            user.last_name = last_name
            user.save()

            return Response({'message': 'Last name updated successfully'})
        else:
            return Response({'error': 'Last name cannot be empty'})


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_first_name(request):
    if request.method == "PUT":
        user = request.user
        first_name = request.data.get('first_name')

        if first_name is not None and first_name != '':
            user.first_name = first_name
            user.save()

            return Response({'message': 'First name updated successfully'})
        else:
            return Response({'error': 'First name cannot be empty'})


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_username(request):
    if request.method == "PUT":
        user = request.user
        username = request.data.get('username')

        if username is not None and username != '':
            user.username = username
            user.save()

            return Response({'message': 'user name updated successfully'})
        else:
            return Response({'error': 'user name cannot be empty'})


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_email(request):
    if request.method == "PUT":
        user = request.user
        email = request.data.get('email')

        if email is not None and email != '' and re.match(r'^[\w\.-]+@[\w\.-]+$', email):
            user.email = email
            user.save()

            return Response({'message': 'Email updated successfully'})
        else:
            return Response({'error': 'Invalid email format or email cannot be empty'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addActor(request):
    if request.method == 'POST':
        form = ActorForm(request.data)
        if form.is_valid():
            form.save()
            return Response({'message': 'Actor added'})
        else:
            return Response({'errors': form.errors})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addProducer(request):
    if request.method == 'POST':
        form = ProducerForm(request.data)
        if form.is_valid():
            form.save()
            return Response({'msg': 'Producer added'})
        else:
            return Response({'errors': form.errors})

# Create your views here.
