내 supabase에 seoul_city_data 테이블이 있는데 이건 서울 실시간 도시 데이터야.
여기에는 아래와 같은 컬럼이 있고 해당 컬럼은 실시간 인구 정보와 상권 정보를 보여줘.
이 데이터를 지도에 실시간으로 표시하고싶어.
예를 들면 스팟별로 인구가 많으면 빨간색으로 보이고, 어느 나이대가 가장 많은지, 그리고 현재 소비는 어떤지 등등을 보여주고싶어.
supabase에서 데이터를 바로바로 가져와서 웹 페이지로 만들 수 있도록 전체적인 계획과 구조를 짜줘.

---

[컬럼 정보]
1	AREA_NM	핫스팟 장소명
2	AREA_CD	핫스팟 코드명
3	LIVE_PPLTN_STTS	실시간 인구현황
4	AREA_CONGEST_LVL	장소 혼잡도 지표
5	AREA_CONGEST_MSG	장소 혼잡도 지표 관련 메세지
6	AREA_PPLTN_MIN	실시간 인구 지표 최소값
7	AREA_PPLTN_MAX	실시간 인구 지표 최대값
8	MALE_PPLTN_RATE	남성 인구 비율(남성)
9	FEMALE_PPLTN_RATE	여성 인구 비율(여성)
10	PPLTN_RATE_0	0~10세 인구 비율
11	PPLTN_RATE_10	10대 실시간 인구 비율
12	PPLTN_RATE_20	20대 실시간 인구 비율
13	PPLTN_RATE_30	30대 실시간 인구 비율
14	PPLTN_RATE_40	40대 실시간 인구 비율
15	PPLTN_RATE_50	50대 실시간 인구 비율
16	PPLTN_RATE_60	60대 실시간 인구 비율
17	PPLTN_RATE_70	70대 실시간 인구 비율
18	RESNT_PPLTN_RATE	상주 인구 비율
19	NON_RESNT_PPLTN_RATE	비상주 인구 비율
20	REPLACE_YN	대체 데이터 여부
21	PPLTN_TIME	실시간 인구 데이터 업데이트 시간
22	FCST_YN	예측값 제공 여부
23	FCST_PPLTN	인구 예측값
24	FCST_TIME	인구 예측시점
25	FCST_CONGEST_LVL	장소 예측 혼잡도 지표
26	FCST_PPLTN_MIN	예측 실시간 인구 지표 최소값
27	FCST_PPLTN_MAX	예측 실시간 인구 지표 최대값
217	LIVE_CMRCL_STTS	실시간 상권 현황
218	AREA_CMRCL_LVL	장소 실시간 상권 현황
219	AREA_SH_PAYMENT_CNT	장소 실시간 신한카드 결제 건수
220	AREA_SH_PAYMENT_AMT_MIN	장소 실시간 신한카드 결제 금액 최소값
221	AREA_SH_PAYMENT_AMT_MAX	장소 실시간 신한카드 결제 금액 최대값
222	RSB_LRG_CTGR	업종 대분류
223	RSB_MID_CTGR	업종 중분류
224	RSB_PAYMENT_LVL	업종 실시간 상권 현황
225	RSB_SH_PAYMENT_CNT	업종 실시간 신한카드 결제 건수
226	RSB_SH_PAYMENT_AMT_MIN	업종 실시간 신한카드 결제 금액 최소값
227	RSB_SH_PAYMENT_AMT_MAX	업종 실시간 신한카드 결제 금액 최대값
228	RSB_MCT_CNT	업종 가맹점 수
229	RSB_MCT_TIME	업종 가맹점 수 업데이트 월
230	CMRCL_MALE_RATE	남성 소비 비율
231	CMRCL_FEMALE_RATE	여성 소비 비율
232	CMRCL_10_RATE	10대 이하 소비 비율
233	CMRCL_20_RATE	20대 소비 비율
234	CMRCL_30_RATE	30대 소비 비율
235	CMRCL_40_RATE	40대 소비 비율
236	CMRCL_50_RATE	50대 소비 비율
237	CMRCL_60_RATE	60대 이상 소비 비율
238	CMRCL_PERSONAL_RATE	개인 소비 비율
239	CMRCL_CORPORATION_RATE	법인 소비 비율
240	CMRCL_TIME	실시간 상권 현황 업데이트 시간