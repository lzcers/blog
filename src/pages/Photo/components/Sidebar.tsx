import { LayoutType, FilterOptions } from '@/types/photo';

interface SidebarProps {
  totalPhotos: number;
  allTags: string[];
  allDates: string[];
  layout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  filter: FilterOptions;
  onFilterChange: (filter: FilterOptions) => void;
}

export const Sidebar = ({
  totalPhotos,
  allTags,
  allDates,
  layout,
  onLayoutChange,
  filter,
  onFilterChange,
}: SidebarProps) => {
  const toggleTag = (tag: string) => {
    const newTags = filter.selectedTags.includes(tag)
      ? filter.selectedTags.filter((t) => t !== tag)
      : [...filter.selectedTags, tag];
    onFilterChange({ ...filter, selectedTags: newTags });
  };

  const selectDate = (date: string | null) => {
    onFilterChange({ ...filter, selectedDate: date });
  };

  return (
    <aside className="photo-sidebar">
      {/* 布局切换 - 简化图标 */}
      <div className="sidebar-section layout-section">
        <div className="layout-toggle">
          <button
            className={layout === 'grid' ? 'active' : ''}
            onClick={() => onLayoutChange('grid')}
            title="网格"
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <rect x="3" y="3" width="7" height="7" fill="currentColor" />
              <rect x="14" y="3" width="7" height="7" fill="currentColor" />
              <rect x="3" y="14" width="7" height="7" fill="currentColor" />
              <rect x="14" y="14" width="7" height="7" fill="currentColor" />
            </svg>
          </button>
          <button
            className={layout === 'vertical' ? 'active' : ''}
            onClick={() => onLayoutChange('vertical')}
            title="垂直"
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <rect x="3" y="3" width="18" height="6" fill="currentColor" />
              <rect x="3" y="11" width="18" height="6" fill="currentColor" />
              <rect x="3" y="19" width="18" height="2" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* 日期筛选 */}
      <div className="sidebar-section">
        <h3>日期</h3>
        <div className="date-list">
          <button
            className={filter.selectedDate === null ? 'active' : ''}
            onClick={() => selectDate(null)}
          >
            全部
          </button>
          {allDates.map((date) => (
            <button
              key={date}
              className={filter.selectedDate === date ? 'active' : ''}
              onClick={() => selectDate(date)}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* 标签筛选 */}
      <div className="sidebar-section">
        <h3>标签</h3>
        <div className="tag-cloud">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`tag-item ${filter.selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 照片数 - 移至底部 */}
      <div className="sidebar-section photo-count-section">
        <p className="photo-count">共 {totalPhotos} 张照片</p>
      </div>
    </aside>
  );
};
