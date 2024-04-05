<script>
import NxbService from "@/services/nxb.service.js";
import { string } from "yup";
export default {
   props: {
       book: { type: Object, required: true },
       tenNXB: { type: String, required:true},
   },
};
</script>

<template>
   <div>
       <div class="p-1">
           <strong>Tên:</strong>
           {{ book.tenSach }}
       </div>
       <div class="p-1">
           <strong>Đơn Giá:</strong>
           {{ book.donGia }}
       </div>
       <div class="p-1">
           <strong>Số Quyển:</strong>
           {{ book.soQuyen }}
       </div>
       <div class="p-1">
           <strong>Năm Xuất Bản:</strong>
           {{ book.namXuatBan }}
       </div>
       <div class="p-1">
           <strong>Nhà Xuất Bản:</strong>
           {{ tenNXB }}
       </div>
       <div class="p-1">
           <strong>Tác Giả:</strong>
           {{ book.tacGia }}
       </div>
   </div>
</template>