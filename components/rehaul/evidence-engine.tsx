import Image from 'next/image'

export function EvidenceEngine() {
  return (
    <div className="production-evidence" aria-label="Animated operating evidence from Vendoreye and RoleField">
      <div className="production-evidence__head"><span>LIVE OPERATING EVIDENCE</span><i>AI7 PRODUCT NETWORK</i></div>
      <div className="production-evidence__boundary" aria-hidden="true" />

      <div className="production-evidence__source production-evidence__source--vendor">
        <Image src="/logo-vendoreye.png" alt="" width={1500} height={500} />
        <span>SUPPLIER<br />INTELLIGENCE</span>
      </div>
      <div className="production-evidence__source production-evidence__source--rolefield">
        <Image src="/logo-rolefield.png" alt="" width={1527} height={341} />
        <span>CUSTOMER<br />OPERATIONS</span>
      </div>

      <div className="production-evidence__engine" aria-hidden="true">
        <i /><i />
        <Image src="/ai7lab-logo.png" alt="" width={607} height={300} priority />
      </div>
      <div className="production-evidence__flow" aria-hidden="true"><i /></div>

      <div className="production-evidence__stage">
        <section className="production-evidence__sequence production-evidence__sequence--vendor">
          <small>Vendoreye / network</small>
          <strong>134,000+</strong>
          <span>registered vendors</span>
          <div className="production-evidence__mini"><b>20+<em>large scale buyers</em></b><b>8,000+<em>tenders published</em></b></div>
        </section>
        <section className="production-evidence__sequence production-evidence__sequence--rolefield">
          <small>ROLEFIELD / OPERATIONS</small>
          <strong>60M+</strong>
          <span>calls completed</span>
          <div className="production-evidence__mini"><b>~10M<em>calls / month</em></b><b>$1M+<em>reported savings</em></b></div>
        </section>
      </div>
    </div>
  )
}
