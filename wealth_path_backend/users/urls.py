from django.urls import path
from . import views
from transactions.views import UserTransactionsListAPIView

urlpatterns=[
    # path("", views.index, name="index"),
    # path("", UserTransactionsListAPIView.as_view()),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register_view, name="register")

]