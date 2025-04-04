package CMS;

/**
 * Generated from IDL struct "EmailCampaign".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public final class EmailCampaign
	implements org.omg.CORBA.portable.IDLEntity
{
	/** Serial version UID. */
	private static final long serialVersionUID = 1L;
	public EmailCampaign(){}
	public java.lang.String campaignId = "";
	public java.lang.String title = "";
	public java.lang.String content = "";
	public java.lang.String targetSegment = "";
	public java.lang.String status = "";
	public EmailCampaign(java.lang.String campaignId, java.lang.String title, java.lang.String content, java.lang.String targetSegment, java.lang.String status)
	{
		this.campaignId = campaignId;
		this.title = title;
		this.content = content;
		this.targetSegment = targetSegment;
		this.status = status;
	}
}
