import React, { Component } from "react";
import axios from "axios";

const DefaultImage = null;
class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multerImage: DefaultImage,
      imageArray: [],
      description: "",
      title: "",
      url: null,
    };
  }
  setDefaultImage(uploadType) {
    if (uploadType == "multer") {
      this.setState({
        multerImage: DefaultImage,
      });
    }
  }

  componentDidMount() {
    const url = "http://localhost:8000/api/images";
    let newArray = [];
    axios.get(url).then((response) => {
      this.setState({
        imageArray: response.data.images,
      });
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleFileChange = (e) => {
    this.setState({
      [e.target.id]: e.target.files[0],
    });
  };

  uploadImage = (e) => {
    let imageObj = {};

    let imageFormObj = new FormData();

    imageFormObj.append("imageName", "multer-image-" + Date.now() + ".png");
    imageFormObj.append("imageData", this.state.multerImage);
    imageFormObj.append("description", this.state.description);
    imageFormObj.append("title", this.state.title);

    axios
      .post("http://localhost:8000/api/images/uploadImage", imageFormObj)
      .then((data) => {
        if (data.data.success) {
          alert("Image has been successfully uploaded using multer");
          this.setDefaultImage("multer");
        }
      })
      .catch((err) => {
        alert("Error uploading the image");
        this.setDefaultImage("multer");
      });
  };

  render() {
    return (
      <div>
        <div className="process">
          <h4>Process:Uploading Image</h4>
          <form>
            <input
              type="file"
              className="process_upload-btn"
              onChange={this.handleFileChange}
              id="multerImage"
            />
            <div>
              <input
                type="text"
                placeholder="description of project"
                id="description"
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Title of the project"
                id="title"
                onChange={this.handleChange}
                required
              />
            </div>

            <button onClick={this.uploadImage}>Upload</button>
          </form>
        </div>
        {this.state.imageArray.length > 0
          ? this.state.imageArray.map((image, index) => (
              <div key={index}>
                <h1>{image.title}</h1>
                <img
                  src={`http://localhost:8000/uploads/${image.imageData}`}
                  alt="Uploaded image"
                  height="300"
                  width="400"
                  key={index}
                  style={{
                    height: 400,
                    width: 500,
                    display: "block",
                    margin: 20,
                    padding: 10,
                    border: 1,
                    borderColor: "black",
                    margin: "auto",
                  }}
                />
                <h3>{image.description}</h3>
              </div>
            ))
          : null}
      </div>
    );
  }
}

export default ImageUpload;
