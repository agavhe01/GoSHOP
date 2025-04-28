# Heroku Deployment Instructions

## Prerequisites
1. Heroku CLI installed
2. Git installed
3. Heroku account

## Deployment Steps

1. Create a new Heroku app:
```bash
heroku create your-app-name
```

2. Set up environment variables on Heroku:
```bash
heroku config:set DEBUG=False
heroku config:set SECRET_KEY=your-secret-key-here
heroku config:set ALLOWED_HOSTS=.herokuapp.com,localhost,127.0.0.1
```

3. Add PostgreSQL database:
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

4. Initialize git repository (if not already done):
```bash
git init
```

5. Add Heroku remote:
```bash
heroku git:remote -a your-app-name
```

6. Deploy to Heroku:
```bash
git add .
git commit -m "Initial deployment"
git push heroku main
```

7. Run migrations:
```bash
heroku run python manage.py migrate
```

8. Create superuser (optional):
```bash
heroku run python manage.py createsuperuser
```

## Important Notes

1. Make sure your `requirements.txt` is up to date
2. The `Procfile` is already configured to use gunicorn
3. Static files are handled by whitenoise
4. Database is configured to use PostgreSQL in production

## Troubleshooting

If you encounter any issues:
1. Check Heroku logs: `heroku logs --tail`
2. Verify environment variables: `heroku config`
3. Ensure all dependencies are in requirements.txt
4. Make sure DEBUG is set to False in production 