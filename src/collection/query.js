/**
 * Query 查询器
 */
export default class Query {

	/**
	 * [$in 查询器 查询条件 解析]
	 * @param         {[type]}                 array [查询数组]
	 * @return        {[type]}                       [查询字符串]
	 */
    static $in(array) {
        return !Array.isArray(array) ? false : array.toString()
    }

}
