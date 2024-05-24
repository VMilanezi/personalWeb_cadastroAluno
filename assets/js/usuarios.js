var usuariosRef = firebase.firestore().collection('usuarios');

// Função para preencher a tabela com os dados dos usuários
function preencherTabela() {
    usuariosRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var data = doc.data();
            var nome = data.nomeCompleto;
            var userId = doc.id;

            var email = data.email;
            var telefone = data.celular;

            // Criar uma nova linha para cada usuário
            var novaLinha = document.createElement('tr');
            novaLinha.setAttribute('data-user-id', userId); // Adiciona o ID do usuário como um atributo de dados

            novaLinha.innerHTML = `<td>${nome}</td><td>${email}</td><td>${telefone}</td><td> <button class="edit-btn" onclick="openEditModal('${userId}', '${nome}', '${email}', '${telefone}')"><img src="assets/img/edit.png" alt="Editar" height="18" width="18" ></button>
            <button class="delete-btn"><img src="assets/img/delete.png" alt="Excluir" height="18" width="18"></button></td>`;

            // Adicionar a nova linha à tabela
            document.querySelector('table').appendChild(novaLinha);

            // Adicionando evento de clique para o botão de exclusão dentro da função de preencherTabela
            novaLinha.querySelector('.delete-btn').addEventListener('click', function() {
                // Pega o ID do usuário da linha clicada na tabela
                var userId = novaLinha.getAttribute('data-user-id');
                // Exclui o usuário do Firestore
                usuariosRef.doc(userId).delete().then(function() {
                    console.log("Usuário excluído com sucesso!");
                    // Remove a linha correspondente da tabela HTML
                    novaLinha.remove();
                }).catch(function(error) {
                    console.error("Erro ao excluir usuário: ", error);
                });
            });
        });
    });
}

window.onload = preencherTabela;
  

  
botaoEditar = document.getElementById('editModal')
botaoEditar.addEventListener('click',console.log('clicou'))
    // Função para abrir o modal de edição
// Função para abrir o modal de edição
function openEditModal(userId, nome, email, telefone) {
    var modal = document.getElementById('editModal');
    modal.style.display = 'block';

    // Preencha os campos do formulário com os dados do usuário selecionado
    document.getElementById('fullname').value = nome;
    document.getElementById('email').value = email;
    document.getElementById('number').value = telefone;
    document.getElementById('user-id').value = userId;
}
// Adicione um evento de clique ao botão "Salvar" no modal de edição
document.getElementById('cadastrar').addEventListener('click', function() {
    var userId = document.getElementById('user-id').value;
    var nome = document.getElementById('fullname').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('number').value;

    // Atualize os dados do usuário no Firestore com os novos valores
    usuariosRef.doc(userId).update({
        nomeCompleto: nome,
        email: email,
        celular: telefone
    }).then(function() {
        // Feche o modal após a atualização
        var modal = document.getElementById('editModal');
        modal.style.display = 'none';

        // Atualize os dados na tabela
        var linhaUsuario = document.querySelector(`tr[data-user-id="${userId}"]`);
        linhaUsuario.innerHTML = `<td>${nome}</td><td>${email}</td><td>${telefone}</td><td> <button class="edit-btn" onclick="openEditModal('${userId}', '${nome}', '${email}', '${telefone}')"><img src="assets/img/edit.png" alt="Editar" height="18" width="18" ></button><button class="delete-btn"><img src="assets/img/delete.png" alt="Excluir" height="18" width="18"></button></td>`;
    }).catch(function(error) {
        console.error('Erro ao atualizar usuário: ', error);
    });
});


// Adicionando evento de clique para cada botão de edição
document.querySelectorAll('.edit-btn').forEach(item => {
    item.addEventListener('click', event => {
      console.log('Clicou em editar');
    });
  });


// Sidebar
const sideBar = document.querySelector(".toggle-btn");

sideBar.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});