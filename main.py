from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request, FastAPI


app = FastAPI()

templates = Jinja2Templates(directory="/")
app.mount("/", StaticFiles(directory="/"))

@app.get("/check")
def serve_home(request: Request):
    return templates.TemplateResponse("index.html", context= {"request": request}) 