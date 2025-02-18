import React, { useState } from 'react';

const BoardWrite = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('자유게시판');
  const [showWarning, setShowWarning] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null); // 미리보기 이미지 URL 상태

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    if (!selectedCategory) setShowWarning(true);
    else setIsModalOpen(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowWarning(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewURL(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    } else {
      setPreviewURL(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', selectedCategory);
    if (file) formData.append('file', file);

    fetch('http://localhost:8090/board/insert', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then(() => alert('게시글이 작성되었습니다.'))
      .catch(() => alert('게시글 작성에 실패했습니다.'));
  };

  return (
    <div className="board-write-container">
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>주제를 선택해주세요</h2>
            <div className="category-buttons">
              {['자유게시판', '자기소개서', '이력서', '면접'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={selectedCategory === cat ? 'active' : ''}
                >
                  {cat}
                </button>
              ))}
            </div>
            {showWarning && <p className="warning">주제를 선택해주세요!</p>}
            <div className="modal-actions">
              <button onClick={handleCloseModal}>확인</button>
              <button onClick={() => setIsModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      <div className="write-content">
        <h1>게시글 작성</h1>
        <div className="selected-category">
          <p>선택된 주제: {selectedCategory}</p>
          <button onClick={handleOpenModal} className="category-btn">주제 변경</button>
        </div>
        <form onSubmit={handleSubmit} className="write-form">
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder='제목을 입력해주세요.'
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder='내용을 입력해주세요.'
            />
          </div>
          <div className="form-group-last">
            <label htmlFor="file">이미지 첨부</label>
            <input type="file" id="file" onChange={handleFileChange} accept="image/*" />
            {previewURL && (
              <div className='imgView'>
                <img src={previewURL} alt="미리보기 이미지" />
              </div>
            )}
          </div>
          <button type="submit" className="submit-btn">작성 완료</button>
        </form>
      </div>
    </div>
  );
};

export default BoardWrite;