import React,{useState} from 'react'
import './Adress.css'
import { db } from './firebase';
import { useHistory } from 'react-router';
import { useStateValue } from './StateProvider';
function Address() {
      const histroy=useHistory();
      const [{basket,user,name},dispatch]=useStateValue ();
      const [firstname, setFirstname] = useState("");
      const [lastname, setLastname] = useState("");
      const [addresso, setAddresso] = useState("");
      const [addresst, setAddresst] = useState("");
      const [landmark, setLandmark] = useState("");
      const [city, setCity] = useState("");
      const [state, setState] = useState("");
      const [zip, setZip] = useState("");
const setAdd=()=>{
      db.collection('users')
              .doc(user?.uid)
              .collection('details')
              .doc('Address')
              .set({
                  FirstName:firstname,
                  LastName:lastname,
                  Address1:addresso,
                  Address2:addresst,
                  Landmark:landmark,
                  City:city,
                  State:state,
                  Zip:zip
              })
              db.collection('users')
              .doc(user?.uid)
              .collection('details')
              .doc('Address')
              .get().then((doc)=>{
                if(doc.exists)
                {
                  dispatch({
                    type:'SET_ADDRESS',
                    address:doc.data()
                  })
                }
              })
              .catch((error)=>{
                console.log("error",error);
              }) 
       histroy.push('/payment');  

}
      return (
      
        <div className="address">
          <div className="addrow">
            <div className="rowe">
               <h5> First Name</h5>
                  <input className="innor" onChange={e=>setFirstname(e.target.value)} type="text"/>
            </div>
            <div className="rowe">
            <h5>Last Name</h5>
                  <input className="innor" onChange={e=>setLastname(e.target.value)} type="text"/>
            </div>
          </div>
          <div className="adddes">
            <h5>Address</h5>
            <input className="bigin" onChange={e=>setAddresso(e.target.value)} type="text"/>
            <h5>Address 2</h5>
            <input className="bigin" onChange={e=>setAddresst(e.target.value)} type="text"/>
            <h5>Landmark</h5>
            <input className="bigin" onChange={e=>setLandmark(e.target.value)} type="text"/>
            </div>
            <div className="addrow">
            <div className="rowe">
               <h5>City</h5>
                  <input className="innor" onChange={e=>setCity(e.target.value)}type="text"/>
            </div>
            <div className="rowe">
            <h5>State</h5>
            <select className="innor" name="state" id="state" class="form-control" onChange={e=>setState(e.target.value)}>
<option value="Andhra Pradesh">Andhra Pradesh</option>
<option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
<option value="Arunachal Pradesh">Arunachal Pradesh</option>
<option value="Assam">Assam</option>
<option value="Bihar">Bihar</option>
<option value="Chandigarh">Chandigarh</option>
<option value="Chhattisgarh">Chhattisgarh</option>
<option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
<option value="Daman and Diu">Daman and Diu</option>
<option value="Delhi">Delhi</option>
<option value="Lakshadweep">Lakshadweep</option>
<option value="Puducherry">Puducherry</option>
<option value="Goa">Goa</option>
<option value="Gujarat">Gujarat</option>
<option value="Haryana">Haryana</option>
<option value="Himachal Pradesh">Himachal Pradesh</option>
<option value="Jammu and Kashmir">Jammu and Kashmir</option>
<option value="Jharkhand">Jharkhand</option>
<option value="Karnataka">Karnataka</option>
<option value="Kerala">Kerala</option>
<option value="Madhya Pradesh">Madhya Pradesh</option>
<option value="Maharashtra">Maharashtra</option>
<option value="Manipur">Manipur</option>
<option value="Meghalaya">Meghalaya</option>
<option value="Mizoram">Mizoram</option>
<option value="Nagaland">Nagaland</option>
<option value="Odisha">Odisha</option>
<option value="Punjab">Punjab</option>
<option value="Rajasthan">Rajasthan</option>
<option value="Sikkim">Sikkim</option>
<option value="Tamil Nadu">Tamil Nadu</option>
<option value="Telangana">Telangana</option>
<option value="Tripura">Tripura</option>
<option value="Uttar Pradesh">Uttar Pradesh</option>
<option value="Uttarakhand">Uttarakhand</option>
<option value="West Bengal">West Bengal</option>
</select>
            </div>
            <div className="rowe">
            <h5>Zip</h5>
                  <input className="innor" onChange={e=>setZip(e.target.value)} type="text"/>
            </div>
            </div>
            <button className="addbtn" onClick={setAdd}>Add address</button>
      
        </div>
    )
}

export default Address
