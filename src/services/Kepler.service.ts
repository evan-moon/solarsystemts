/**
 * @name Kepler.service
 * @author Evan Moon
 * @desc 케플러 방정식 서비스
 */

class KeplerService {
    /**
     * @name getEccentricity
     * @desc 뉴턴랩슨메소드를 사용하여 Eccentricity값을 반환한다
     * 뉴턴랩슨메소드는 maxIter값 만큼만 재귀호출 된다.
     */
    public getEccentricity (nextStep: Function, x1: number, maxIter: number) {
        let x = 0;
        for (let i = 0; i < maxIter; i++) {
            x = x1;
            x1 = nextStep(x);
        }

        return x1;
    }
    /**
     * @name computeLaguerre
     * @desc http://adsbit.harvard.edu//full/1986CeMec..39..199C/0000206.000.html
     */
    public computeLaguerre (x: number, f: number, f1:number, f2: number): number {
        return x + (
            -5 * f / (
                f1 + Math.sign(f1) *  Math.sqrt(
                    Math.abs(16 * f1 * f1 - 20 * f * f2)
                )
            )
        );
    }
    /**
     * @name computed
     * @desc 이심률이 0.0 < e < 0.9인 타원일 경우
     */
    public compute (e: number, M: number) {
        return x => {
            return x + (
                M + e * Math.sin(x) - x
            ) / (
                1 - e * Math.cos(x)
            );
        }
    }
    /**
     * @name computeWithLaguerre
     * @desc 이심률이 0.9 <= e < 1.0인 타원일 경우
     */
    public computeWithLaguerre (e: number, M: number) {
        return x => {
            const sin = e * Math.sin(x);
            const cos = e * Math.cos(x);
            const f = x - sin - M;
            const f1 = 1 - cos;
            const f2 = sin;

            return this.computeLaguerre(x, f, f1, f2);
        }
    }
    /**
     * @name computeWithLaguerreHyp
     * @desc 이심률이 1 이상인 포물선인 경우
     */
    public computeWithLaguerreHyp (e: number, M: number) {
        return x => {
            const sin = e * Math.sinh(x);
            const cos = e * Math.cosh(x);
            const f = x - sin - M;
            const f1 = cos - 1;
            const f2 = sin;

            return this.computeLaguerre(x, f, f1, f2);
        }
    }
}

const instance = new KeplerService();
export default instance;
