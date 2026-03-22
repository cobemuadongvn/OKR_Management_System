import React, { useState } from 'react';
import './App.css';

// --- MOCK DATA ---
const MOCK_USER = {
  name: 'Diễm Nguyễn',
  role: 'Manager',
  email: 'diem.nguyen@company.com',
  avatar: 'DN'
};

const INITIAL_OKRS = [
  {
    id: 1,
    title: 'Tăng trưởng doanh thu toàn cầu Q1/2026',
    quarter: 'Q1/2026',
    status: 'On Track',
    overallProgress: 65,
    krs: [
      { id: 101, title: 'Đạt mốc doanh số 2 tỷ VNĐ', target: 2000, current: 1500, unit: 'Tr' },
      { id: 102, title: 'Ký thành công 5 hợp đồng Enterprise lớn', target: 5, current: 3, unit: 'Hợp đồng' }
    ]
  },
  {
    id: 2,
    title: 'Nâng cấp trải nghiệm Hệ thống CNTT',
    quarter: 'Q1/2026',
    status: 'At Risk',
    overallProgress: 25,
    krs: [
      { id: 201, title: 'Giảm thời gian downtime xuống dưới 10 phút/tháng', target: 10, current: 90, unit: 'Phút (Nghịch đảo)', type: 'inverse' },
      { id: 202, title: '100% nhân sự dùng thẻ định danh điện tử', target: 100, current: 20, unit: '%' }
    ]
  }
];

// --- APP COMPONENT ---
function App() {
  const [user, setUser] = useState(null); // null = not logged in
  const [okrs, setOkrs] = useState(INITIAL_OKRS);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedKR, setSelectedKR] = useState(null);
  const [isCreateKRModalOpen, setCreateKRModalOpen] = useState(false);
  const [selectedOkrIdForKR, setSelectedOkrIdForKR] = useState(null);
  const [filterQuarter, setFilterQuarter] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // --- Handlers ---
  const handleLogin = (e) => {
    e.preventDefault();
    setUser(MOCK_USER);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const openUpdateModal = (kr, okrId) => {
    setSelectedKR({ ...kr, okrId });
    setUpdateModalOpen(true);
  };

  const submitUpdateKR = (e) => {
    e.preventDefault();
    const newValue = parseInt(e.target.newValue.value, 10);
    const note = e.target.note.value;

    // Calculate new OKR state
    const updatedOkrs = okrs.map(okr => {
      if (okr.id === selectedKR.okrId) {
        let totalPct = 0;
        const newKrs = okr.krs.map(kr => {
          if (kr.id === selectedKR.id) {
            kr.current = newValue;
            if (!kr.history) kr.history = [];
            kr.history.push({
              date: new Date().toLocaleDateString('vi-VN'),
              value: newValue,
              note: note || 'Đã cập nhật tiến độ'
            });
          }
          let pct = (kr.current / kr.target) * 100;
          if (kr.type === 'inverse') pct = kr.current <= kr.target ? 100 : Math.max(0, 100 - ((kr.current - kr.target) / kr.target * 100)); // Rough inverse calculation for Demo
          totalPct += Math.min(100, pct);
          return kr;
        });
        const newOverall = Math.round(totalPct / newKrs.length);
        const newStatus = newOverall < 30 ? 'At Risk' : 'On Track';
        return { ...okr, krs: newKrs, overallProgress: newOverall, status: newStatus };
      }
      return okr;
    });

    setOkrs(updatedOkrs);
    setUpdateModalOpen(false);
    setSelectedKR(null);
  };

  const openCreateKRModal = (okrId) => {
    setSelectedOkrIdForKR(okrId);
    setCreateKRModalOpen(true);
  };

  const submitCreateKR = (e) => {
    e.preventDefault();
    const title = e.target.krTitle.value;
    const target = parseFloat(e.target.krTarget.value);
    const unit = e.target.krUnit.value;
    
    const updatedOkrs = okrs.map(okr => {
      if (okr.id === selectedOkrIdForKR) {
        const newKr = {
          id: Date.now(),
          title,
          target,
          current: 0,
          unit,
          type: 'normal'
        };
        const newKrs = [...okr.krs, newKr];
        
        let totalPct = 0;
        newKrs.forEach(kr => {
          let pct = (kr.current / kr.target) * 100;
          if (kr.type === 'inverse') pct = kr.current <= kr.target ? 100 : Math.max(0, 100 - ((kr.current - kr.target) / kr.target * 100));
          totalPct += Math.min(100, Math.max(0, pct || 0));
        });
        const newOverall = newKrs.length > 0 ? Math.round(totalPct / newKrs.length) : 0;
        const newStatus = newOverall < 30 ? 'At Risk' : 'On Track';
        
        return { ...okr, krs: newKrs, overallProgress: newOverall, status: newStatus };
      }
      return okr;
    });
    
    setOkrs(updatedOkrs);
    setCreateKRModalOpen(false);
    setSelectedOkrIdForKR(null);
  };

  const deleteOkr = (okrId) => {
    if (window.confirm('Bạn có chắc muốn xóa Objective này khỏi hệ thống?')) {
      setOkrs(okrs.filter(o => o.id !== okrId));
    }
  };

  const deleteKr = (okrId, krId) => {
    if (window.confirm('Bạn có chắc muốn xóa Key Result này?')) {
      const updatedOkrs = okrs.map(okr => {
        if (okr.id === okrId) {
          const newKrs = okr.krs.filter(k => k.id !== krId);
          // Recalculate O progress
          let totalPct = 0;
          newKrs.forEach(kr => {
            let pct = (kr.current / kr.target) * 100;
            if (kr.type === 'inverse') pct = kr.current <= kr.target ? 100 : Math.max(0, 100 - ((kr.current - kr.target) / kr.target * 100));
            totalPct += Math.min(100, Math.max(0, pct || 0));
          });
          const newOverall = newKrs.length > 0 ? Math.round(totalPct / newKrs.length) : 0;
          const newStatus = newOverall < 30 ? 'At Risk' : 'On Track';
          return { ...okr, krs: newKrs, overallProgress: newOverall, status: newStatus };
        }
        return okr;
      });
      setOkrs(updatedOkrs);
    }
  };

  const submitCreateOKR = (e) => {
    e.preventDefault();
    const title = e.target.objTitle.value;
    const quarter = e.target.quarter.value;
    const newOkr = {
      id: Date.now(),
      title,
      quarter,
      status: 'On Track',
      overallProgress: 0,
      krs: []
    };
    setOkrs([newOkr, ...okrs]);
    setCreateModalOpen(false);
  };

  // --- Render Login ---
  if (!user) {
    return (
      <div className="login-page animate-fade-in">
        <div className="login-card">
          <div className="login-brand">Align OKR</div>
          <p className="login-desc">Enterprise Goal Management System</p>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Tài khoản (Email)</label>
              <input type="email" defaultValue="diem.nguyen@company.com" required />
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input type="password" defaultValue="123456" required />
            </div>
            <button className="submit-btn" type="submit">Đăng Nhập</button>
          </form>
        </div>
      </div>
    );
  }

  // --- Render Dashboard ---
  const filteredOkrs = okrs.filter(okr => {
    if (filterQuarter !== 'All' && okr.quarter !== filterQuarter) return false;
    if (filterStatus !== 'All' && okr.status !== filterStatus) return false;
    return true;
  });

  const totalObj = filteredOkrs.length;
  const avgProgress = totalObj ? Math.round(filteredOkrs.reduce((acc, o) => acc + o.overallProgress, 0) / totalObj) : 0;
  const atRiskObj = filteredOkrs.filter(o => o.status === 'At Risk').length;

  return (
    <div className="app-container animate-fade-in">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand-logo">Align OKR</div>
        <ul className="nav-links">
          <li className="nav-item">
            <button className="nav-btn active">Dashboard</button>
          </li>
          <li className="nav-item">
            <button className="nav-btn">My OKRs</button>
          </li>
          <li className="nav-item">
            <button className="nav-btn">Company OKRs</button>
          </li>
          <li className="nav-item">
            <button className="nav-btn">Reports</button>
          </li>
        </ul>
        <div className="user-profile">
          <div className="avatar">{user.avatar}</div>
          <div className="user-info">
            <p>{user.name}</p>
            <span>{user.role}</span>
          </div>
          <button style={{ marginLeft: 'auto', background: 'none', color: '#ef4444', fontSize: 12, fontWeight: 'bold' }} onClick={handleLogout}>D/X</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="page-header">
          <div>
            <h2>Tổng quan Mục tiêu</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>Phòng ban: Engineering  •  Quý: Q1/2026</p>
          </div>
          <div className="header-actions">
            <button onClick={() => setCreateModalOpen(true)}>+ Tạo Objective Mới</button>
          </div>
        </header>

        {/* Dashboard Cards */}
        <section className="summary-grid" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-label">Tiến độ chung</div>
            <div className="stat-value">{avgProgress}%</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Tổng Objective</div>
            <div className="stat-value" style={{ background: '#10b981', WebkitBackgroundClip: 'text' }}>{totalObj}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Đang gặp rủi ro</div>
            <div className="stat-value" style={{ background: '#ef4444', WebkitBackgroundClip: 'text' }}>{atRiskObj}</div>
          </div>
        </section>

        {/* Filters */}
        <section className="filters-section" style={{ display: 'flex', gap: 16, marginBottom: 24, background: 'var(--card-bg)', padding: 16, borderRadius: 12, border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)' }}>Lọc theo Quý:</label>
            <select style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid var(--border-color)', outline: 'none' }} value={filterQuarter} onChange={(e) => setFilterQuarter(e.target.value)}>
              <option value="All">Tất cả</option>
              <option value="Q1/2026">Q1/2026</option>
              <option value="Q2/2026">Q2/2026</option>
              <option value="Q3/2026">Q3/2026</option>
              <option value="Q4/2026">Q4/2026</option>
              <option value="Năm 2026">Cả Năm 2026</option>
              <option value="Q1/2027">Q1/2027</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)' }}>Lọc Trạng thái:</label>
            <select style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid var(--border-color)', outline: 'none' }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">Tất cả</option>
              <option value="On Track">On Track</option>
              <option value="At Risk">At Risk</option>
            </select>
          </div>
        </section>

        {/* OKRs List */}
        <section className="okr-list">
          <h3 className="okr-list-header">Danh sách OKR Hiện Tại</h3>
          {filteredOkrs.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', background: 'var(--card-bg)', borderRadius: 16, border: '1px dashed var(--border-color)' }}>
              <p style={{ color: 'var(--text-muted)' }}>Không có Objective nào phù hợp với bộ lọc.</p>
            </div>
          )}
          {filteredOkrs.map(okr => (
            <div className="okr-card" key={okr.id}>
              <div className="okr-card-header">
                <div className="okr-title">{okr.title}</div>
                <div className="okr-meta" style={{ alignItems: 'center' }}>
                  <span className="badge quarter">{okr.quarter}</span>
                  <span className={`badge ${okr.status === 'On Track' ? 'track' : 'risk'}`}>{okr.status}</span>
                  <button onClick={() => deleteOkr(okr.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 600, marginLeft: 8, fontSize: 13, textDecoration: 'underline' }} title="Xóa Objective này">Xóa</button>
                </div>
              </div>

              <div className="progress-container">
                <div className="progress-info">
                  <span>Tiến độ Objective</span>
                  <span>{okr.overallProgress}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${okr.overallProgress}%`, background: okr.overallProgress <= 30 ? 'linear-gradient(135deg, #ef4444, #f87171)' : 'var(--primary-gradient)' }}></div>
                </div>
              </div>

              <div className="krs-wrapper">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Key Results</div>
                  <button className="kr-update-btn" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }} onClick={() => openCreateKRModal(okr.id)}>+ Thêm KR</button>
                </div>
                {okr.krs.length === 0 ? <p style={{ fontSize: 13, color: '#94a3b8' }}>Chưa có Key Result. Vui lòng thêm!</p> : null}
                {okr.krs.map(kr => {
                  let pct = kr.type === 'inverse'
                    ? (kr.current <= kr.target ? 100 : Math.max(0, 100 - ((kr.current - kr.target) / kr.target * 100)))
                    : (kr.current / kr.target) * 100;
                  pct = Math.min(100, Math.round(pct));

                  return (
                    <div className="kr-item" key={kr.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <div className="kr-title">{kr.title}</div>
                        <div style={{ flex: 1, margin: '0 20px' }}>
                          <div className="progress-track" style={{ height: 6, background: '#e2e8f0', width: '100%' }}>
                            <div className="progress-fill" style={{ width: `${pct}%`, background: '#3b82f6' }}></div>
                          </div>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, width: 120, textAlign: 'right' }}>{kr.current} / {kr.target} {kr.unit} ({pct}%)</div>
                        <button className="kr-update-btn" style={{ marginLeft: 16 }} onClick={() => openUpdateModal(kr, okr.id)}>Cập nhật</button>
                        <button className="kr-update-btn" style={{ marginLeft: 8, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }} onClick={() => deleteKr(okr.id, kr.id)}>Xóa</button>
                      </div>
                      {kr.history && kr.history.length > 0 && (
                        <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: 6, fontSize: 13 }}>
                          <span style={{ fontWeight: 600, color: '#3b82f6' }}>Lịch sử check-in gần nhất:</span>
                          <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>{kr.history[kr.history.length - 1].note} (Cập nhật thành: <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{kr.history[kr.history.length - 1].value}</span>) - {kr.history[kr.history.length - 1].date}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* --- Modals --- */}

      {/* Create Objective Modal */}
      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <h3 className="modal-title">Tạo Objective Mới</h3>
              <button className="close-btn" onClick={() => setCreateModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={submitCreateOKR}>
              <div className="form-group">
                <label>Tên Objective</label>
                <input type="text" name="objTitle" placeholder="Ví dụ: Thống lĩnh thị trường Đông Nam Á..." required />
              </div>
              <div className="form-group">
                <label>Chu kỳ / Quý áp dụng</label>
                <select name="quarter">
                  <option value="Q1/2026">Q1/2026</option>
                  <option value="Q2/2026">Q2/2026</option>
                  <option value="Q3/2026">Q3/2026</option>
                  <option value="Q4/2026">Q4/2026</option>
                  <option value="Năm 2026">Cả Năm 2026</option>
                  <option value="Q1/2027">Q1/2027</option>
                </select>
              </div>
              <button className="submit-btn" type="submit">Lưu Objective</button>
            </form>
          </div>
        </div>
      )}

      {/* Update Progress KR Modal */}
      {isUpdateModalOpen && selectedKR && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <h3 className="modal-title">Cập nhật Key Result</h3>
              <button className="close-btn" onClick={() => setUpdateModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={submitUpdateKR}>
              <div style={{ marginBottom: 20, padding: 12, background: 'rgba(79, 70, 229, 0.05)', borderRadius: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)' }}>KR CHỌN CẬP NHẬT</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>{selectedKR.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Đang đạt: <span style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>{selectedKR.current} / {selectedKR.target} {selectedKR.unit}</span></div>
              </div>

              <div className="form-group">
                <label>Giá trị thực tế mới nhất ({selectedKR.unit})</label>
                <input type="number" name="newValue" defaultValue={selectedKR.current} required />
              </div>
              <div className="form-group">
                <label>Ghi chú / Khó khăn (Không bắt buộc)</label>
                <textarea name="note" rows="3" style={{ width: '100%', padding: 12, border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 14 }} placeholder="Nhập update note..."></textarea>
              </div>
              <button className="submit-btn" type="submit">Cập Nhật Tiến Độ</button>
            </form>
          </div>
        </div>
      )}

      {/* Create KR Modal */}
      {isCreateKRModalOpen && selectedOkrIdForKR && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <h3 className="modal-title">Thêm Key Result Mới</h3>
              <button className="close-btn" onClick={() => setCreateKRModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={submitCreateKR}>
              <div className="form-group">
                <label>Tên Key Result</label>
                <input type="text" name="krTitle" placeholder="Ví dụ: Đạt 1000 lượt tải app..." required />
              </div>
              <div className="form-group">
                <label>Mục tiêu (Target)</label>
                <input type="number" name="krTarget" placeholder="Ví dụ: 1000" required />
              </div>
              <div className="form-group">
                <label>Đơn vị tính</label>
                <input type="text" name="krUnit" placeholder="Ví dụ: Lượt tải, VNĐ, %..." required />
              </div>
              <button className="submit-btn" type="submit" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>Lưu Key Result</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
