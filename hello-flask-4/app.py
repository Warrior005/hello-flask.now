
from flask import Flask, render_template, jsonify, request
import sqlite3

app = Flask(__name__)

# (NOVO) --- banco de dados ----------
def conectar():
    return sqlite3.connect("banco.db")

def criar_tabela():
    conn = conectar()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS consultas (
            id    INTEGER PRIMARY KEY AUTOINCREMENT,
            nome  TEXT,
            idade INTEGER,
            situacao TEXT
        )
    """)
    conn.commit()
    conn.close()

@app.route("/")
def home():
    return render_template("index.html")

# (NOVO) ---------- rotas ----------
@app.route("/api/save-hello", methods=["POST"])
def api_save_hello():
    dados = request.get_json()

    nome = dados.get("nome", "").strip()
    idade = int(dados.get("idade",0))

    if idade > 65:
        situacao = "LIBERADO"
        tempo_restante = 0
    else:
        situacao = "PENDENTE"
        tempo_restante = 65 - idade

    # (NOVO) ------- grava no banco -------
    conn = conectar()
    conn.execute("INSERT INTO consultas (nome, idade, situacao) VALUES (?, ?, ?)", (nome, idade, situacao))
    conn.commit()
    conn.close()

    return jsonify({
       "mensagem": nome, 
       "idade": idade,
       "situacao": situacao,
       "tempo_restante": tempo_restante})

# NOVO: ----- devolve tudo que está gravado ----- 
@app.route("/api/select-hello", methods=["GET"])
def api_select_hello():
    conn = conectar()
    linhas = conn.execute("SELECT nome, idade, situacao FROM consultas").fetchall()
    conn.close()
 
    lista = []
    for linha in linhas:
        lista.append({"nome": linha[0], "idade": linha[1], "situacao": linha[2]})
 
    return jsonify(lista)



criar_tabela()   # NOVO: ----- garante que a tabela existe ao subir o servidor

if __name__ == "__main__":
    app.run()