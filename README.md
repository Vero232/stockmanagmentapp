# stockmanagmentapp

How to setup API locally
1. In the appsettings.json change to the connecting string to your DB
2. In the package manager console run dotnet ef migrations add InitialCreate --context DataContext
3.Then run dotnet ef database update --context DataContext
4. In the package manager console run dotnet ef migrations add InitialIdentityCreate --context IdentityDataContext
5. Then run dotnet ef database update --context IdentityDataContext
6. Run the project and use the api/registration endpoint via Swagger to create a user to login the angular app (use appriopriate password strength)

How to run the Angular Application
1. Change the API endpoint in the stock.service.ts file in the baseAPIUrl variable to your the port your localhost is running the api on
2. Make sure the API is running on your local
3. Use ng serve --open to run the Angular Application
4. A login screen will appear, use the email and password you've registed with via the api/registration endpoint in Swagger to login to the application


