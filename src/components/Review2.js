
import React, { useState,useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

function Review2() {
  const [credentials, setCredentials] = useState({name:""}) 
  //
  const [panel, setPanel] = useState(null);
  const [rollno, setRollno] = useState(null);
  const [prn, setPrn] = useState(null);
  const [studata, setStudata] = useState([]);

  //guide
  const [pairs, setPairs] = useState([]);
  // const [guideEmail, setGuideEmail] = useState(null);
  const [studentEmail, setStudentEmail] = useState('');

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
     
  //       const response = await fetch('http://localhost:5000/getpair', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ guideEmail:guideEmail}),
  //       });
  //       const data = await response.json();
  //       setStudentEmail(data[0].student_email);
  //       // console.log(data[0].student_email)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchData();
  // }, []);
  // console.log(studentEmail)

  // const guideEmail = localStorage.getItem('guideEmail')
 


  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
console.log("clicked")
    // const response = await fetch('http://localhost:5000/getstudentdetails', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email: studentEmail }),
    // });
  
    // const data = await response.json();

    const {name} = credentials;
    console.log(name)
    event.preventDefault();
  
    if (!file) {
      setMessage('Please select a file.');
      return;
    }
 const NGOEmail = localStorage.getItem('guideEmail')
 console.log(NGOEmail)
    const formData = new FormData();
    formData.append('ppt', file);
    formData.append('filename', file.name);
    formData.append('NGOEmail', NGOEmail );
    formData.append('projectname', name );

  console.log(file.name);
    try {
      const response = await fetch('http://localhost:5000/sendppt', {
        method: 'POST',
        body: formData
      });
      localStorage.setItem("filename",file.name)
  //JSON.stringify({ email: email, file:file , filename:file.name }),
      if (response.ok) {
        setMessage('File uploaded successfully.');
        setFile(null);
      } else {
        setMessage('Failed to upload file.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while uploading the file.');
    }
  };
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <Container>
      <h1 style={{color:'white'}} >Upload Project</h1>
      <Form onSubmit={handleSubmit} enctype="multipart/form-data">
        <Form.Group controlId="formFile">
          <Form.Label>Select a PowerPoint file</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <div className="mb-3 p" >
                    <label htmlFor="name" className="form-label">Add Project Name</label>
                    <input onChange={onChange} type="test" className="form-control"  id="name" name="name" aria-describedby="emailHelp" />
                 </div>
        <Button variant="primary" type="submit">
          Upload
        </Button>
        {message && <p>{message}</p>}
      </Form>
    </Container>
  );
}

export default Review2;