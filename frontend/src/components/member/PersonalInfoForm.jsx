import React from "react"

const PersonalInfoForm = ({
  member,
  setMember,
  handleSubmit,
  handleFile,
  imgPreview,
}) => {
  console.log(member)
  /** 🔹 입력 값 변경 핸들러 */
  const handleChange = (e) => {
    const { name, value } = e.target
    setMember((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form className='personalInfoForm' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>프로필 이미지</label>
        <div className='profile-img-container'>
          <div className={`memberImg ${!imgPreview ? "no-file" : ""}`}>
            {imgPreview ? (
              <img src={imgPreview} alt='profile' />
            ) : (
              <img src='/images/profile.png' alt='default profile' />
            )}
          </div>
          <label htmlFor='profileUpload' className='fileUploadLabel'>
            파일 선택
          </label>
          <input
            type='file'
            id='profileUpload'
            accept='image/*'
            onChange={handleFile}
          />
        </div>
      </div>

      <div className='form-group'>
        <label>이메일</label>
        <input
          type='email'
          name='userEmail'
          value={member.userEmail || ""}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>비밀번호</label>
        <input
          type='password'
          name='userPw'
          value={member.userPw || ""}
          onChange={handleChange}
          readOnly
        />
      </div>

      <div className='form-group'>
        <label>이름</label>
        <input
          type='text'
          name='userName'
          value={member.userName || ""}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>닉네임</label>
        <input
          type='text'
          name='nickName'
          value={member.nickName || ""}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>주소</label>
        <input
          type='text'
          name='address'
          value={member.address || ""}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>나이</label>
        <input
          type='number'
          name='age'
          value={member.age || ""}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>전화번호</label>
        <input
          type='text'
          name='phone'
          value={member.phone || ""}
          onChange={handleChange}
        />
      </div>

      <button type='submit'>수정하기</button>
    </form>
  )
}

export default PersonalInfoForm
