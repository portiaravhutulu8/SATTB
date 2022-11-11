import axios from 'axios';
import { StyleSheet } from 'react-native';
import {useState, useEffect, Fragment} from 'react';
import {useLocation} from 'react-router';
import queryString from 'query-string';

const PasswordReset = () => {
    const [newPassword, setNewPassword] = useState({
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState("");
    const location = useLocation();
    const history = useHistory();
    const [invalidUser, setInvalidUser] = useState("");
    const [busy, setBusy] = useState(true);
    const [success, setSuccess] = useState(false);

    const {token, id} = queryString.parse(location.search);

    const url = `http://localhost:3000/user/reset-password?token=${token}&id=${id}`;
    

    const verifyToken = async () => {
        try {
            
            const {data} = await axios(`http://localhost:3000/user/verify-token?token=${token}&id=${id}`);
            setBusy(false);
        } catch (error) {
            if(error?.response?.data){
                const {data} = error.response;
                if(!data.success) return setInvalidUser(data.error);
                return console.log(error.response.data);
            }
            console.log(error);
        }
        
    };

    useEffect(() => {
        verifyToken();
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {password, confirmPassword} = newPassword;
        if(password.trim().length < 8 || password.trim().length > 20){
            return setError('Password must be 8 to 20 characters long!')
        }
        if(password!==confirmPassword){
            return setError('Password does not match!')
        }

        try {
            setBusy(true);
            const {data} = await axios.post(url, {password});
            setBusy(false);

            if(data.success){
                history.replace('/reset-password');
                setSuccess(true);
                
            }
            
        } catch (error) {
            if(error?.response?.data){
                const {data} = error.response;
                if(!data.success) return setInvalidUser(data.error);
                return console.log(error.response.data);
            }
            console.log(error);
        }
    };
    const handleOnChange = ({target}) => {
        const {name, value} = target;

        setNewPassword({...newPassword, [name]: value});
    };

    if(success) return (<div className='max-w-screen-sm m-auto pt-40'>
        <h1 className='text-center text-3xl text-gray-500 mb-3' >Password Reset Successfully.</h1>
    </div>
    );

    if(invalidUser) return (<div className='max-w-screen-sm m-auto pt-40'>
        <h1 className='text-center text-3xl text-gray-500 mb-3' >{invalidUser}</h1>
    </div>
    );

    if(busy) return (<div className='max-w-screen-sm m-auto pt-40'>
        <h1 className='text-center text-3xl text-gray-500 mb-3' >Wait for a moment, verifying reset token.</h1>
    </div>
    );

    return(
        <Fragment>
                <div className="max-w-screen-sm m-auto pt-40">
                <h1 className="text-center text-3xl text-gray-500 mb-3">Reset Password</h1>
                <form className="shadow w-full rounded-lg p-10" onSubmit={handleSubmit}>
                    {error &&<p className='text-center p-2 mb-3 bg-red-500 text-white'>{error}</p>}
                    <div className="space-y-8">
                    <input type="password" name='password' placeholder='********' onChange={handleOnChange}  className="px-3 text-lg h-10 w-full border-gray-500 border-2 rounded" />
                    <input type="password"  name='confirmPassword' placeholder='********' onChange={handleOnChange} className="px-3 text-lg h-10 w-full border-gray-500 border-2 rounded" />

                    <input type="submit" value="Reset Password" className="bg-gray-500 w-full py-3 text-white rounded" />
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default PasswordReset;

const stylesheet = StyleSheet.create({

    error_msg: {
        width: 370,
        textAlign: 'center',
        borderRadius: 15,
        color: 'white',
        backgroundColor: '#f34646',
        fontSize: 14,
        margin: 5,
        padding: 15,
    
      },
      success_msg: {
        width: 370,
        textAlign: 'center',
        borderRadius: 15,
        color: 'white',
        backgroundColor: '#5cdd5c',
        fontSize: 14,
        margin: 5,
        padding: 15,
      }
});