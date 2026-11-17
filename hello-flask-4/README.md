# meu help preparacao de ambiente virtual

### verificar o py exe
python --version


### montar o ambiente virtual
python -m venv .venv                          

### ativar o ambiente virtual (win)
.venv\Scripts\activate.ps1

### em caso de erro, ignorar as regras de permissao na sua sessao de shell. ativar novamente (win)
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

### instalar o framework web flask 
pip list # (verificar ja tem o flask)
pip install flask

### subir o server
python -m flask run
ou 
python app.py 