from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.respondents import router as respondent_router
from app.api.v1.devices import router as device_router
from app.api.v1.sensor_logs import router as sensor_log_router
from app.api.v1.predictions import router as prediction_router

app = FastAPI(
    title="Stress Monitoring API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(respondent_router)
app.include_router(device_router)
app.include_router(sensor_log_router)
app.include_router(prediction_router)

@app.get("/")
def root():
    return {
        "message": "Stress Monitoring API",
    }


# ============ KONFIGURASI JWT BEARER DI SWAGGER ============
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        routes=app.routes,
    )

    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }

    for path in openapi_schema["paths"].values():
        for operation in path.values():
            operation.setdefault(
                "security",
                [{"BearerAuth": []}],
            )

    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi
# ============================================================