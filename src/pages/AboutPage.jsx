export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-12 py-12 bg-cream-50 rounded-[50px] border-1 border-cream-200 shadow-md  ">
      <p className="text-bark-400 text-xs font-sans tracking-widest uppercase mb-4">Câu chuyện của chúng mình</p>
      <h1 className="font-serif text-5xl text-ink-900 leading-tight mb-8">
        Sách là những người thầy <span className="italic text-bark-600">tĩnh lặng</span> nhất.
      </h1>

      <div className="space-y-6 text-bark-600 font-sans text-base leading-relaxed">
        <p>
          Tiệm sách của Vịt ra đời từ một niềm tin giản đơn: một cuốn sách đúng lúc có thể thay đổi mọi thứ.
          Chúng mình là một tiệm sách độc lập, nơi kết nối bạn đọc với những câu chuyện và ý tưởng thực sự giá trị.
        </p>
        <p>
          Mỗi tựa sách tại tiệm đều được tuyển chọn kỹ lưỡng bởi đội ngũ những người yêu chữ.
          Thay vì chạy theo số lượng, chúng mình ưu tiên chiều sâu — một danh mục nhỏ nhưng đầy tâm huyết thay vì một kho tàng khổng lồ gây choáng ngợp.
        </p>
        <p>
          Dù bạn đang tìm kiếm một cuốn tiểu thuyết kinh điển, một bản khảo cứu sâu sắc hay một món quà cho người thương,
          Vịt luôn ở đây để giúp bạn tìm thấy mảnh ghép tâm hồn ấy.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-16 border-t border-cream-200 pt-12">
        {[
          { stat: '12+', label: 'Thể loại tuyển chọn' },
          { stat: '1.200+', label: 'Đầu sách sẵn có' },
          { stat: '98%', label: 'Độc giả hài lòng' },
        ].map(({ stat, label }) => (
          <div key={label}>
            <p className="font-serif text-4xl text-ink-900">{stat}</p>
            <p className="text-bark-400 text-sm font-sans mt-1">{label}</p>
          </div>
        ))}
      </div>
    </main>
  )
}