
<!DOCTYPE html>
<html>
<head><title>Teste Testnet DOGE</title></head>
<body>
<h2>Login</h2>
<div id="login">
<input id="email" placeholder="Email"><br><br>
<input id="password" type="password" placeholder="Senha"><br><br>
<button onclick="login()">Entrar</button>
<button onclick="showRegister()">Criar Conta</button>
</div>

<div id="register" style="display:none;">
<h3>Registar</h3>
<input id="re" placeholder="Email"><br><br>
<input id="rp" type="password" placeholder="Senha"><br><br>
<button onclick="registerUser()">Criar</button>
</div>

<div id="dash" style="display:none;">
<h2>Painel</h2>
<p>Passos: <span id="steps">0</span></p>
<p>DOGE: <span id="doge">0</span></p>
<button onclick="mine()">Adicionar Passo</button>

<h3>Levantamento Testnet</h3>
<input id="amt" placeholder="DOGE"><br><br>
<button onclick="withdraw()">Levantar</button>

<h3>Histórico</h3>
<pre id="history"></pre>
</div>

<script src="scripts/app.js"></script>
</body>
</html>
