from django.shortcuts import render

def registration_view(request):
    return render(request, 'register.html')

def login_view(request):
    return render(request, 'login.html')

def dashboard_view(request):
    return render(request, 'members/template/dashboard.html')
