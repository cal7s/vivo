# Code Citations

## License: unknown
https://github.com/carloswagner1/Recrutamento_e_Selecao/tree/d68b1017ebd6b5deb09411aaefe6b189ad4b3397/frontend/view/gerenciarPerfil.html

```
"Feminino">Feminino</option>
        <option value="Masculino">Masculino</option>
        <option value="Outro">Outro</option>
        <option value="Prefiro não dizer">Prefiro não dizer</option>
    </select
```
<!-- ...seu HTML dos produtos... -->

<script>
document.querySelectorAll('.favorito-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const coracao = this.querySelector('.coracao');
        if (coracao.textContent === '♡') {
            coracao.textContent = '♥';
            coracao.classList.add('curtido');
        } else {
            coracao.textContent = '♡';
            coracao.classList.remove('curtido');
        }
    });
});
</script>
</body>
</html>
````
