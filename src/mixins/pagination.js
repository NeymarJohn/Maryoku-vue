import PaginationConstants from '@/constants/pagination'

export const paginationMixin = {
  components: {
    PaginationConstants
  },
  data () {
    return {
      pagination: {
        limit: PaginationConstants.ROWS_PER_PAGE,
        page: 1,
        total: 0,
        from: 1,
        to: PaginationConstants.ROWS_PER_PAGE
      },
    }
  },
  methods: {
    pageChanged (page) {
      this.fetchData(page)
    },
    updatePagination(data) {
      this.pagination.total = data.total
      this.pagination.from = ((data.page - 1) * data.limit) + 1
      this.pagination.to = data.page * PaginationConstants.ROWS_PER_PAGE
    }
  }
}