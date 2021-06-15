# VUE là gì?
Vue là một ***framework linh động*** để xây dựng giao diện người dùng (user-inerfaces).
# Tạo 1 dự án Vue với Vue-CLI
## Cài đặt Vue-CLI:
`$ npm install -g @vue/cli`
## Tạo dự án mới:
`$ vue create project-name`
# Component
## Khái niệm:
***Component*** là các đối tượng Vue có thể được tái sử dụng thông qua tên.
Chúng ta có thể dùng component này như là một phần tử bên trong đối tượng Vue gốc được tạo bởi `new Vue`
```
// Định nghĩa một component với tên là "button-counter"
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">Bạn đã bấm {{ count }} lần.</button>'
})
```
## Cấu trúc 1 Component:
+ **props**: là các thuộc tính tùy chỉnh ta có thể đăng ký trên một component
+ **data**: 
  khi định nghĩa component, chúng ta không nên truyền thẳng một object vào data mà thay vào đó phải truyền vào 1 hàm. Bằng cách này, mỗi đối tượng của component có thể duy trì một bản sao riêng biệt của đối tượng data được trả về
+ **template**: chứa các thẻ html hiển thị nội dung của component
+ **emits**
# Các thành phần trong Vue:
+ **data**: chứa tất cả các thuộc tính(property) của 1 object
+ **methods**:
  + Là danh sách các phương thức của component.
  + Trong Vue instance có thể khai báo nhiều các phương thức trong thuộc tính methods.
  + Phương thức trong thuộc tính methods của Vue instance có thể đưa vào các logic hoặc những công việc như lấy dữ liệu từ chính data của Vue instance
  + Methods sẽ được gọi mỗi khi component được render
+ **computed**:
  + Được sử dụng khi muốn thực hiện các công việc riêng rẽ không phụ thuốc vào các hàm khác
  + Thực hiện các công việc như 1 function. Tuy nhiên, mỗi function() trong nó chỉ được coi là property nên khi gọi không có dấu '()'
  + Vì không nhận tham số đầu vào nên computed chỉ nên dùng với các dữ liệu có sẵn trong data của component
  + Điều tuyệt vời của computed là nó sẽ được lưu vào bộ nhớ tạm thời nên giả sử bạn có 1 computed với hàng loạt tính toán, nhiều vòng lặp trong đó, mà nếu các các biến phụ thuộc không thay đổi thì khi sử dụng nó sẽ chỉ mất thời gian tính 1 lần, những lần sau kết quả sẽ được sử dụng lại từ lần trước.
+ **watch**:
  + Watcher theo dõi sự thay đổi của biến để thực hiện 1 hành động nào đó.
+ **components**
+ **conditional rendering**:
  + `v-if`, `v-else-if`, `v-else`: các câu lệnh điều kiện
  + `v-show`: 
    + Cách dùng tương tự `v-if`.
    + Điểm khác biệt giữa `v-show` và `v-if` là phần tử được đánh dấu với `v-show` sẽ luôn luôn được render và chứa trong DOM;
      `v-show` chỉ bật tắt thuộc tính display của phần tử này.
+ **loop**: 
  + Duyệt 1 mảng các phần tử bằng `v-for`:
    + Sử dụng `v-for` để render một danh sách các item dựa trên một mảng
    + Cú pháp theo dạng `v-for="item in items"`, trong đó `items` là mảng dữ liệu nguồn và `item` trỏ đến phần tử mảng đang được duyệt đến
  + Dùng `v-for` với 1 object:
    + Ta cũng có thể dùng `v-for` để duyệt qua các thuộc tính của một object: `v-for="value in object"`
    + Ta cũng có thể cung cấp tham số thứ hai dùng cho khóa (key) của thuộc tính: `v-for="(value, key) in object"`
    + Tham số thứ ba chỉ thứ tự của thuộc tính: `v-for="(value, key, index) in object"`
   > *Lưu ý: Để Vue có thể nhận ra từng node và nhờ đó có thể tái sử dụng và sắp xếp các phần tử, bạn cần cung cấp một thuộc tính key với giá trị độc nhất cho từng item (ví dụ, id sẽ là một giá trị key lí tưởng): `v-for="item in items" :key="item.id"`*
  + `v-for` dùng với component:
    + Ta có thể dùng `v-for` trực tiếp trên một component như một phần tử bình thường: \
      `<my-component v-for="item in items" :key="item.id"></my-component>`
    > Từ bản `2.2.0` trở đi, thuộc tính `key` là bắt buộc khi dùng v-for với một `component`
 # Vòng đời của Vue instance
![lifecycle](https://user-images.githubusercontent.com/52211781/121986168-43cf3500-cdc0-11eb-9534-c39655b8b292.png)
> **Những hooks thường dùng và cần quan tâm đến:**
>   + **`created`**: thường dùng để gọi API lấy dữ liệu từ server, khởi tạo websocket, lắng nghe event Laravel Echo,... miễn là ta không động gì vào DOM thật là được
>   + **`mounted`**: thường dùng khi ta muốn sử dụng `JQuery` hoặc truy vấn tới 1 phần tử HTML cụ thể, ví dụ: `document.getElementById('id')`,...
>   + **`beforeDestroy`**: thường dùng khi ta muốn huỷ lắng nghe các sự kiện: như sự kiện `onscroll`, hay các sự kiện lắng nghe socket.io, larave-echo,...
