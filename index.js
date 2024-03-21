function findTransactions() {
    firebase.firestore().collection('sitePersonal').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data()); // Exibe os dados do documento
        });
    }).catch(error => {
        console.error("Erro ao recuperar documentos:", error);
    });
}

findTransactions();

function adicionarUsuario() {
    // Capturando os valores dos campos de entrada
    const nomeCompleto = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('number').value;
    const senha = document.getElementById('password').value;
    const confirmarSenha = document.getElementById('confirmPassword').value;
    const genero = document.querySelector('input[name="gender"]:checked').value;

    // Validação dos campos (se necessário)

    // Verifica se a senha e a confirmação de senha são iguais
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem");
        return;
    }

    // Adiciona o usuário ao Firestore
    firebase.firestore().collection('cadastro').add({
        nomeCompleto: nomeCompleto,
        email: email,
        celular: celular,
        senha: senha,
        genero: genero
        // Adicione outros campos conforme necessário
    })
        .then((docRef) => {
            console.log("Usuário adicionado com ID: ", docRef.id);
            // Limpar campos de entrada após a adição bem-sucedida
            document.getElementById('fullname').value = '';
            document.getElementById('email').value = '';
            document.getElementById('number').value = '';
            document.getElementById('password').value = '';
            document.getElementById('confirmPassword').value = '';
        })
        .catch((error) => {
            console.error("Erro ao adicionar usuário: ", error);
            // Trate o erro adequadamente
        });
}