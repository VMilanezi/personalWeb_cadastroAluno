document.addEventListener('DOMContentLoaded', function () {
    const firebaseConfig = {
        apiKey: "AIzaSyB5yN8aSHdWMXLPghJhKj81U_r-NqXI61o",
        authDomain: "sitepersonal-32eb9.firebaseapp.com",
        projectId: "sitepersonal-32eb9",
        storageBucket: "sitepersonal-32eb9.appspot.com",
        messagingSenderId: "140124961554",
        appId: "1:140124961554:web:8cff7d3d2258ecf04d51cb"
    };

    firebase.initializeApp(firebaseConfig);

    function findTransactions() {
        firebase.firestore().collection('cadastro').get().then(snapshot => {
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


    if (window.location.pathname.includes("usuarios.html")) {
        const db = firebase.firestore();
        const usuariosRef = db.collection("cadastro");

        usuariosRef.onSnapshot(function (snapshot) {
            // Limpa o corpo da tabela

            const usuariosTable = document.querySelector('#usuarios');
            console.log(usuariosTable);
            if (usuariosTable) {
                usuariosTable.innerHTML = '';
                // Itera sobre os documentos recuperados do Firestore
                snapshot.forEach(function (doc) {
                    var dado = doc.data();
                    var newRow = document.querySelector('#usuarios').insertRow();
                    newRow.innerHTML = '<td>' + dado.nomeCompleto + '</td>' + '<td>' + dado.email + '</td>' + '<td>' + dado.celular + '</td>';

                    // Adiciona os ícones clicáveis na célula "Ações"
                    var actionsCell = newRow.insertCell();
                    var editIcon = document.createElement('img');
                    editIcon.src = './assets/img/edit.png';
                    editIcon.title = 'Editar';
                    editIcon.alt = 'Editar';
                    editIcon.classList.add('iconEdit');
                    editIcon.style.cursor = 'pointer';
                    actionsCell.appendChild(editIcon);

                    var deleteIcon = document.createElement('img');
                    deleteIcon.src = './assets/img/delete.png';
                    deleteIcon.title = 'Excluir';
                    deleteIcon.alt = 'Excluir';
                    deleteIcon.classList.add('iconDelete');
                    deleteIcon.style.cursor = 'pointer';
                    actionsCell.appendChild(deleteIcon);

                    // Armazena o ID do usuário como um atributo data na linha da tabela
                    newRow.setAttribute('data-user-id', doc.id);


                    editIcon.addEventListener('click', function () {
                        console.log('Editar usuário')
                    });

                    deleteIcon.addEventListener('click', function () {
                        // Pega o ID do usuário da linha clicada na tabela
                        var userId = newRow.getAttribute('data-user-id');
                        // Exclui o usuário do Firestore
                        db.collection("cadastro").doc(userId).delete().then(function () {
                            console.log("Usuário excluído com sucesso!");
                            // Remove a linha correspondente da tabela HTML
                            newRow.remove();
                        }).catch(function (error) {
                            console.error("Erro ao excluir usuário: ", error);
                        });
                    });
                });
            } else {
                console.error("Elemento '#usuarios' não encontrado no DOM.");
            }
        });
    }
});