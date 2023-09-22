

from django.urls import path
from . import views

urlpatterns =[
    path('register', views.register),
    path('login', views.user_login),
    path('profile', views.profile),
    path('genre', views.getGenres),
    path('year', views.getYears),
    path('country', views.getCountry),
    path('actor', views.getActors),
    path('producer', views.getProducers),
    path('film', views.addFilm),
    path('getFilm', views.getFilms),
    path('film/<int:id>',views.getFilmById),
    path('commentFilm/', views.addComentFilm),
    path('delFilm/<int:id>',views.delFilm),
    path('logout', views.logout_user),
    path('filterGenre/<str:genre>', views.filterGenre),
    path('filterYear/<int:year>',views.filterYear),
    path('filterCountry/<int:country>', views.filterCountry),
    path('changePassword/', views.change),
    path('search/<str:title>',views.filter),
    path('change_last_name/',views.update_last_name),
    path('change_first_name/', views.update_first_name),
    path('change_email/', views.update_email),
    path('change_username/', views.update_username),
    path('get_comment/<int:id>', views.get_comment),
    path('comments/delete/<int:id>', views.deleteComment),
    path('addActors/', views.addActor),
    path('addProducer/', views.addProducer)
]
