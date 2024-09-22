const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile-name", file);
      console.log(formData.profile - image);

      const response = await apiClient.post(ADD_PROFILE_IMAGE, formData, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.image) {
        setUserInfo({ ...userInfo, image: response.data.image });
        toast.success("Image updated successfully ");
      } else {
        toast.error("something got wrong ! try again");
      }

      //this as reader.readAsDataurl completed onload method fires . it converts img to base64 for <img > integration
      //its not compalsory for upload process its just for preview on front end
      const reader = new FileReader();
      reader.onload = async () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
