document.addEventListener('DOMContentLoaded', function () {
    const firebaseConfig = {
        apiKey: "AIzaSyDPdvvr0BehxgAX-0gl3GjbeZf_FNGkDbw",
        authDomain: "sitepersonal-28a8f.firebaseapp.com",
        projectId: "sitepersonal-28a8f",
        storageBucket: "sitepersonal-28a8f.appspot.com",
        messagingSenderId: "551007212453",
        appId: "1:551007212453:web:4c72b19f4cc9402e684e4c"
      };

    firebase.initializeApp(firebaseConfig);

    function findTransactions() {
        firebase.firestore().collection('usuarios').get().then(snapshot => {
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

        // Verifica se a senha e a confirmação de senha são iguais
        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem");
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
    
});