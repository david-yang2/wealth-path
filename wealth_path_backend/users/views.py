from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
# Create your views here.
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.contrib.auth.forms import UserCreationForm
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try: 
            response = super().post(request, *args, **kwargs)

            tokens = response.data
            # return response.data

            access_token = tokens['access']
            refresh_token = tokens["refresh"]

            res = Response()
            res.data = {"success":True}


            res.set_cookie(
                key = "access_token",
                value = access_token,
                httponly = True,
                secure = True,
                samesite = "None",
                path = "/"
            )

            res.set_cookie(
                key="refresh_token", 
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/"
            )

            return res
        except:
            return Response({"success":False})









# def index(request):
#     if not request.user.is_authenticated:
#         return HttpResponseRedirect(reverse("login"))
#     return render(request, 'users/user.html')


# def login_view(request):
#     if request.method == "POST":
#         username = request.POST["username"]
#         password = request.POST["password"]

#         user = authenticate(request, username=username, password=password)


#         if user:
#             login(request, user)
#             return HttpResponseRedirect('/transactions/')
#         else:
#             return render(request, "users/login.html", {
#                 "message": "Invalid Credentials"
#             })    
#     return render(request, "users/login.html")

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    refresh_token = request.data.get("refresh")
    if not refresh_token:
        return Response({"error": "Refresh token is required."}, status=400)

    try:
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Successfully logged out."})
    except TokenError:
        return Response({"error": "Invalid or expired token."}, status=400)

def register_view(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request,user)
            return HttpResponseRedirect(reverse("index"))
    else:
        form = UserCreationForm()
    return render(request, 'users/register.html',{
        "form":form
    })

