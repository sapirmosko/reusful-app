import { CategoriesInterface } from "../../../../model/CategorieInterface";
import "./Categorie.css";
import { NavLink } from "react-router-dom";

function Categorie({
  categorieName,
}: {
  categorieName: CategoriesInterface;
}): JSX.Element {
  return (
    <div className="Categorie">
      <NavLink to={`/categorie/` + categorieName._id}>
        <div className="CategorieMain">
          <div className="CategorieImg">
            <img src={`${categorieName.categorieImage}`} alt="" />
          </div>
          <div className="CategorieName">
            <span>{categorieName.categorieName}</span>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default Categorie;
