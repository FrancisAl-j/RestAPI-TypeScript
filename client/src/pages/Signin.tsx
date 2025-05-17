import { Link } from "react-router-dom";
import Button from "../components/Button";

const Signin = () => {
  return (
    <section>
      <div className="flex">
        <div>
          <form>
            <header></header>
          </form>
        </div>
        <div>
          <div>
            <h1>Welcome to Yapster</h1>
            <p>Yap it out loud - with Yapster</p>
            <Link to="/signup">
              <Button type="signup">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
