import React from 'react';
import '../../css/filtros.css';

function Filtros({ filtros, setFiltros }) {
  const handleChange = (e) => {
    setFiltros({
      ...filtros,
      ...estilo,
      ...tela,
      ...acabado,
      ...color,
      ...tapizMaterial,
      ...materialInterno,

      [e.target.name]: e.target.value,
    });
  };

  // Define las opciones de estilo, tela, acabado, color, etc.
  const estilo = ["", "Contemporáneo", "Rústico", "Moderno"];
  const tela = ["", "Cuero", "Telabonita", "Lino"]; // Actualiza según los datos de la API
  const acabado = ["", "Cuero", "Aceite", "Liso", "Transparente", "Mate", "Brillante"]; // Ajusta los acabados según los datos
  const color = ["", "Negro", "Madera", "Blanco", "Azul Marino", "Marrón"]; // Ajusta los colores según los datos
  const tapizMaterial = ["", "Cuero", "Tela"];
  const materialInterno = ["", "Triplex", "Contrachapado", "Espuma", "Metal"];

  return (
    <div className="filtros-container">
      <h3>Filtros de Búsqueda</h3>

      <label>
        <i className="bx bx-list-plus">
          <span className="link">Categoría: </span>
        </i>
        <select name="categoria" value={filtros.categoria} onChange={handleChange}>
          <option value="">Todas</option>
          <option value="mueble">Mueble</option>
          {/* Agrega más opciones según tus necesidades */}
        </select>
      </label>

      <label>
        <i className="bx bxs-map icon">
          <span className="link">Estilo: </span>
        </i>
        <select name="estilo" value={filtros.estilo} onChange={handleChange}>
          {estilo.map((estilo) => (
            <option key={estilo} value={estilo}>
              {estilo}
            </option>
          ))}
        </select>
      </label>

      <label>
        <i className="bx bx-money icon">
          <span className="link">Tela: </span>
        </i>
        <select name="tela" value={filtros.tela} onChange={handleChange}>
          {tela.map((tela) => (
            <option key={tela} value={tela}>
              {tela}
            </option>
          ))}
        </select>
      </label>

      <label>
        <i className="bx bx-money icon">
          <span className="link">Acabado: </span>
        </i>
        <select name="acabado" value={filtros.acabado} onChange={handleChange}>
          {acabado.map((acabado) => (
            <option key={acabado} value={acabado}>
              {acabado}
            </option>
          ))}
        </select>
      </label>

      <label>
        <i className="bx bx-money icon">
          <span className="link">Color: </span>
        </i>
        <select name="color" value={filtros.color} onChange={handleChange}>
          {color.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </label>

      <label>
        <i className="bx bx-money icon">
          <span className="link">Tapiz Material: </span>
        </i>
        <select name="tapizMaterial" value={filtros.tapizMaterial} onChange={handleChange}>
          {tapizMaterial.map((tapiz) => (
            <option key={tapiz} value={tapiz}>
              {tapiz}
            </option>
          ))}
        </select>
      </label>

      <label>
        <i className="bx bx-money icon">
          <span className="link">Material Interno: </span>
        </i>
        <select name="materialInterno" value={filtros.materialInterno} onChange={handleChange}>
          {materialInterno.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
      </label>

      <label>
        <i className="bx bx-money icon">
          <span className="link">Precio Min: </span>
        </i>
        <input
          className='filtrom'
          type="number"
          name="minPrecio"
          value={filtros.minPrecio}
          onChange={handleChange}
        />
      </label>

      <label>
        <i className="bx bx-money icon">
          <span className="link">Precio Max:</span>
        </i>
        <input
          className='filtrom'
          type="number"
          name="maxPrecio"
          value={filtros.maxPrecio}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default Filtros;
