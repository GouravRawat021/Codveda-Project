"""
views.py — Authentication Views
"""

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import LoginForm, RegisterForm


def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)

        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']

            # authenticate() checks the email/password against
            # the database. Returns a User object if valid, None if not.
            user = authenticate(request, username=email, password=password)

            if user is not None:
                # login() creates a session for this user.
                # They'll stay logged in until they log out
                # or the session expires.
                login(request, user)
                messages.success(request, 'Welcome back!')
                return redirect('/')
            else:
                messages.error(request, 'Invalid email or password.')
    else:
        form = LoginForm()

    return render(request, 'users/login.html', {'form': form})


def register_view(request):

    if request.method == 'POST':
        form = RegisterForm(request.POST)

        if form.is_valid():
            # form.save() creates the user with a hashed password
            user = form.save()

            # Automatically log in the new user after registration
            login(request, user)
            messages.success(request, 'Account created successfully!')
            return redirect('/')
    else:
        form = RegisterForm()

    return render(request, 'users/register.html', {'form': form})


def logout_view(request):

    logout(request)
    messages.info(request, 'You have been logged out.')
    return redirect('/')
