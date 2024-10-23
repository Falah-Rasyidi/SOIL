import os

def create_controllers(strings):
    # Navigate to the controllers directory
    controllers_path = os.path.join("..", "controllers")
    os.makedirs(controllers_path, exist_ok=True)
    
    # Create a controller file for each string
    for string in strings:
        controller_filename = os.path.join(controllers_path, f"{string.lower()}.controller.js")
        with open(controller_filename, "w") as file:
            file.write(f"// Controller for {string}")
        print(f"Created controller file: {controller_filename}")

def create_routes(strings):
    # Navigate to the routes directory
    routes_path = os.path.join("..", "routes")
    os.makedirs(routes_path, exist_ok=True)
    
    # Create a routes file for each string
    for string in strings:
        routes_filename = os.path.join(routes_path, f"{string.lower()}.routes.js")
        with open(routes_filename, "w") as file:
            file.write(f"// Routes for {string}")
        print(f"Created routes file: {routes_filename}")

def create_models(strings):
    # Navigate to the models directory within the database directory
    database_path = os.path.join("..", "database")
    models_path = os.path.join(database_path, "models")
    os.makedirs(models_path, exist_ok=True)
    
    # Create a model file for each string
    for string in strings:
        model_filename = os.path.join(models_path, f"{string.lower()}.js")
        with open(model_filename, "w") as file:
            file.write(f"// Model for {string}")
        print(f"Created model file: {model_filename}")

def main():
    strings = ["user", "reviews", "product", "discount", "cart", "purchase"]  # Example list of strings
    
    create_controllers(strings)
    create_routes(strings)
    create_models(strings)

if __name__ == "__main__":
    main()
