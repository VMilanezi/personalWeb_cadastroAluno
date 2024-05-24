document.getElementById('cadastrar').addEventListener('click', adicionarUsuario);
function adicionarUsuario() {
    // Capturando os valores dos campos de entrada no momento do clique
    const nomeCompleto = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('number').value;
    const senha = document.getElementById('password').value;
    const confirmarSenha = document.getElementById('confirmPassword').value;
    const generoElement = document.querySelector('input[name="gender"]:checked');
    const genero = generoElement ? generoElement.value : null;

    // Verifica se a senha e a confirmação de senha são iguais
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem");
        return;
    }

    // Verifica se o gênero foi selecionado
    if (!genero) {
        alert("Por favor, selecione um gênero");
        return;
    }

    // Adiciona o usuário ao Firestore
    firebase.firestore().collection('usuarios').add({
        nomeCompleto: nomeCompleto,
        email: email,
        celular: celular,
        senha: senha,
        genero: genero
        // Adicione outros campos conforme necessário
    })
    .then((docRef) => {
        console.log("Usuário adicionado com ID: ", docRef.id);
        // Limpa os campos de entrada após adicionar o usuário
        document.getElementById('fullname').value = '';
        document.getElementById('email').value = '';
        document.getElementById('number').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';
        const selectedGender = document.querySelector('input[name="gender"]:checked');
        if (selectedGender) {
            selectedGender.checked = false;
        }
    })
    .catch((error) => {
        console.error("Erro ao adicionar usuário: ", error);
        // Trate o erro adequadamente
    });
}

function findTransactions() {
    firebase.firestore().collection('usuarios').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            // Processamento dos documentos aqui, se necessário
        });
    }).catch(error => {
        console.error("Erro ao recuperar documentos:", error);
    });
}

findTransactions();
