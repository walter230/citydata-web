
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = ({ data }) => {
    if (!data) {
        return (
            <div className="dashboard-panel">
                <div className="no-selection">
                    <h3>장소를 선택하세요</h3>
                    <p>지도에서 마커를 클릭하여 실시간 데이터를 확인하세요</p>
                </div>
            </div>
        );
    }

    // Helper to determine status color key
    const getStatusColor = (lvl) => {
        switch (lvl) {
            case '여유': return 'var(--status-relaxed)';
            case '보통': return 'var(--status-normal)';
            case '약간 붐빔': return 'var(--status-buzzing)';
            case '붐빔': return 'var(--status-congested)';
            default: return 'var(--text-secondary)';
        }
    };

    // Age chart data
    const ageData = {
        labels: ['0-9', '10s', '20s', '30s', '40s', '50s', '60s', '70+'],
        datasets: [
            {
                label: '인구 비율 (%)',
                data: [
                    data.PPLTN_RATE_0,
                    data.PPLTN_RATE_10,
                    data.PPLTN_RATE_20,
                    data.PPLTN_RATE_30,
                    data.PPLTN_RATE_40,
                    data.PPLTN_RATE_50,
                    data.PPLTN_RATE_60,
                    data.PPLTN_RATE_70,
                ],
                backgroundColor: 'rgba(37, 99, 235, 0.6)',
            },
        ],
    };

    const ageOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' },
            title: { display: true, text: '연령대별 인구 비율' },
        },
    };

    // Gender Consumtion chart data
    const genderData = {
        labels: ['남성', '여성'],
        datasets: [
            {
                label: '소비 비율 (%)',
                data: [
                    data.CMRCL_MALE_RATE,
                    data.CMRCL_FEMALE_RATE,
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
            },
        ],
    };

    const genderOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' },
            title: { display: true, text: '성별 소비 비율' },
        },
    };

    return (
        <div className="dashboard-panel">
            <div className="panel-header">
                <h2 className="location-title">{data.AREA_NM}</h2>
                <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(data.AREA_CONGEST_LVL) }}
                >
                    {data.AREA_CONGEST_LVL}
                </span>
                <p style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {data.AREA_CONGEST_MSG}
                </p>
            </div>

            <div className="stat-grid">
                <div className="stat-card">
                    <div className="stat-label">실시간 인구</div>
                    <div className="stat-value">{data.LIVE_PPLTN_STTS || '-'}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">업데이트 시간</div>
                    <div className="stat-value" style={{ fontSize: '1rem' }}>
                        {data.PPLTN_TIME ? data.PPLTN_TIME.substring(0, 16).replace('T', ' ') : '-'}
                    </div>
                </div>
            </div>

            <div className="chart-container">
                <Bar data={ageData} options={ageOptions} />
            </div>

            {/* Only show consumption if data exists */}
            {(data.CMRCL_MALE_RATE || data.CMRCL_FEMALE_RATE) && (
                <div className="chart-container">
                    <Doughnut data={genderData} options={genderOptions} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
