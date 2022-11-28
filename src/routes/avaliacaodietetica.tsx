import { Link } from 'react-router-dom';

const AvaliacaoDietetica = () => {
  return (
    <>
      <h1>Avaliação dietética</h1>
      <Link to='/'>Voltar para o início</Link>

      <details>
        <summary>Desjejum</summary>
        <table>
          <tr>
            <th>nome</th>
            <th>quantidade</th>
            <th>kcal</th>
            <th>carboidratos</th>
            <th>proteínas</th>
            <th>gorduras</th>
          </tr>
          <tr>
            <td>arroz, cozido, integral</td>
            <td>3 colheres de arroz</td>
            <td>250</td>
            <td>85g</td>
            <td>9,7g</td>
            <td>5,4g</td>
          </tr>
        </table>
      </details>
      <details>
        <summary>Colação</summary>
        Tabela
      </details>
      <details>
        <summary>Almoço</summary>
        Tabela
      </details>
      <details>
        <summary>Lanche da tarde</summary>
        Tabela
      </details>
      <details>
        <summary>Jantar</summary>
        Tabela
      </details>
      <details>
        <summary>Ceia</summary>
        Tabela
      </details>
    </>
  );
};

export default AvaliacaoDietetica;
