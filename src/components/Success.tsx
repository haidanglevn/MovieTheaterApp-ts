import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <div className='successPage'>
           <h1>Bought ticket succesfully.</h1> 
           <p>You can find your tickets at your Profile panel</p>
           <Link to={"/"}>
            <button>Go back to homepage</button>
           </Link>
        </div>
    );
};

export default Success;